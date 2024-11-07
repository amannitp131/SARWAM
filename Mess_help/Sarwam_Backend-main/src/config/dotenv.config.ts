import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}
