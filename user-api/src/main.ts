import { NestFactory } from "@nestjs/core";
import { AppModule } from "./application/app.module";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import * as morgan from "morgan";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = "api";

  app.enableCors();
  app.setGlobalPrefix(prefix);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    morgan("combined", {
      immediate: true,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Bank Auth API - Docs")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  Logger.log(
    `Swagger docs running on ${process.env.APP_URL}:${process.env.PORT}/docs`,
  );

  await app.listen(process.env.PORT, () =>
    Logger.log(
      `Application running on ${process.env.APP_URL}:${process.env.PORT}/${prefix}`,
    ),
  );
}
bootstrap();
