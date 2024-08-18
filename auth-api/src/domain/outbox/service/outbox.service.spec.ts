import { SpecUtils } from "@shared/utils/spec.utils";
import { OutboxRepositoryInterface } from "../repository/outbox.repository.interface";
import { OutboxService } from "./outbox.service";
import { ClientEventEmmiterInterface } from "@infrastructure/client_event_emmiter/client_event_emmiter.service.interface";
import { of, throwError } from "rxjs";

describe("OutboxService", () => {
  let outboxService: OutboxService;
  let outboxRepositoryMock: jest.Mocked<OutboxRepositoryInterface>;
  let clientEventEmmiterMock: jest.Mocked<ClientEventEmmiterInterface>;

  const specUtils = new SpecUtils();

  beforeEach(() => {
    outboxRepositoryMock =
      specUtils.outboxRepository() as jest.Mocked<OutboxRepositoryInterface>;
    clientEventEmmiterMock =
      specUtils.clientEventEmmiter() as jest.Mocked<ClientEventEmmiterInterface>;

    outboxService = new OutboxService(
      outboxRepositoryMock,
      clientEventEmmiterMock,
    );
  });

  afterEach(() => {
    specUtils.resetAllMocks();
  });

  describe("emitEvents", () => {
    it("should emit events", async () => {
      const outboxEvents = specUtils.mockOutboxEvents();
      outboxRepositoryMock.findUnprocessed.mockResolvedValueOnce(outboxEvents);

      const handleEventSpy = jest.spyOn(outboxService, "handleEvent");

      await outboxService.emitEvents();

      expect(handleEventSpy).toHaveBeenCalledTimes(outboxEvents.length);
    });

    it("should handle no events to emit", async () => {
      outboxRepositoryMock.findUnprocessed.mockResolvedValueOnce([]);

      const handleEventSpy = jest.spyOn(outboxService, "handleEvent");

      await outboxService.emitEvents();

      expect(handleEventSpy).not.toHaveBeenCalled();
    });
  });

  describe("handleEvent", () => {
    it("should process an event correctly", async () => {
      const event = specUtils.mockOutboxEvents()[0];
      clientEventEmmiterMock.publish.mockResolvedValue(null);

      await outboxService.handleEvent(event);

      expect(clientEventEmmiterMock.publish).toHaveBeenCalledWith(
        "BANK_EXCHANGE",
        event.eventType,
        event.payload,
      );
      expect(outboxRepositoryMock.markAsProcessed).toHaveBeenCalledWith(
        event.id,
      );
      expect(outboxRepositoryMock.markAsFailed).not.toHaveBeenCalled();
    });

    it("should call markAsFailed on event emission error", async () => {
      const event = specUtils.mockOutboxEvents()[0];
      clientEventEmmiterMock.publish.mockRejectedValueOnce(new Error());

      await outboxService.handleEvent(event);

      expect(clientEventEmmiterMock.publish).toHaveBeenCalledWith(
        "BANK_EXCHANGE",
        event.eventType,
        event.payload,
      );
      expect(outboxRepositoryMock.markAsFailed).toHaveBeenCalledWith(event.id);
      expect(outboxRepositoryMock.markAsProcessed).not.toHaveBeenCalled();
    });
  });
});
