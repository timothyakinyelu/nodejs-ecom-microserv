import start from './app';
import { serverSettings } from './config';

/** call the start function which starts the gateway service.
 * this is included in it's own file for expansion purposes. 
 * for instance if a database is to be added.
 */
start({ port: serverSettings.port });