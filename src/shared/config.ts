import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { plainToInstance } from 'class-transformer';
import { IsString, Matches, validateSync } from 'class-validator';

/**
 * Check existing .env file
 */
if (!fs.existsSync(path.resolve('.env'))) {
  console.error('Không tìm thấy file .env');
  process.exit(1);
}

/**
 * JWT expires format type (compile-time)
 */
type TimeUnit = 's' | 'm' | 'h' | 'd';
export type JwtExpiresIn = `${number}${TimeUnit}`;

/**
 * Runtime env validation schema
 */
class ConfigSchema {
  @IsString()
  DATABASE_URL!: string;

  @IsString()
  ACCESS_TOKEN_SECRET!: string;

  @IsString()
  REFRESH_TOKEN_SECRET!: string;

  @IsString()
  @Matches(/^\d+[smhd]$/, {
    message: 'ACCESS_TOKEN_EXPIRES_IN must be like 15m, 1h, 7d',
  })
  ACCESS_TOKEN_EXPIRES_IN!: string;

  @IsString()
  @Matches(/^\d+[smhd]$/, {
    message: 'REFRESH_TOKEN_EXPIRES_IN must be like 7d, 30d',
  })
  REFRESH_TOKEN_EXPIRES_IN!: string;
}

/**
 * Validate env at runtime
 */
const configServer = plainToInstance(ConfigSchema, process.env);
const errors = validateSync(configServer, {
  skipMissingProperties: false,
});

if (errors.length > 0) {
  console.error('❌ Các giá trị trong file .env không hợp lệ');
  throw errors.map((e) => ({
    property: e.property,
    constraints: e.constraints,
    value: e.value,
  }));
}

/**
 * Export env with CORRECT TypeScript types
 */
const envConfig = {
  DATABASE_URL: configServer.DATABASE_URL,

  ACCESS_TOKEN_SECRET: configServer.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: configServer.REFRESH_TOKEN_SECRET,

  ACCESS_TOKEN_EXPIRES_IN:
    configServer.ACCESS_TOKEN_EXPIRES_IN as JwtExpiresIn,

  REFRESH_TOKEN_EXPIRES_IN:
    configServer.REFRESH_TOKEN_EXPIRES_IN as JwtExpiresIn,
};

export default envConfig;
