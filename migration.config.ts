import config from 'datasource.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions = config as DataSourceOptions;

const datasource = new DataSource(dataSourceOptions);
datasource.initialize();
export default datasource;
