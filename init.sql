IF DB_ID('holidays_calendar_db') IS NULL 
BEGIN
CREATE DATABASE holidays_calendar_db;
END GO

USE holidays_calendar_db;
GO

IF OBJECT_ID('dbo.holiday_type','U') IS NULL
BEGIN
CREATE TABLE holiday_type(
	id_holiday_type BIGINT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	status VARCHAR(64) NOT NULL,
	create_at DATETIME NOT NULL,
	modified_at DATETIME NULL,
	deleted_at DATETIME NULL,
);
END
GO

IF OBJECT_ID('dbo.holiday','U') IS NULL
BEGIN
CREATE TABLE holiday(
  id_holiday BIGINT IDENTITY(1,1) PRIMARY KEY,
  holiday_type_id BIGINT NOT NULL,
  name VARCHAR(128) NOT NULL,
  date DATE NOT NULL,
  is_recovery BIT NOT NULL,
  status VARCHAR(64) NOT NULL,
  create_at DATETIME NOT NULL,
  modified_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_holiday_holiday_type FOREIGN KEY (holiday_type_id) REFERENCES holiday_type (id_holiday_type)
);
END
GO

-- Semillas mínimas (opcional)
IF NOT EXISTS (SELECT 1 FROM dbo.holiday_type)
BEGIN
  INSERT INTO dbo.holiday_type (name, status,create_at) VALUES
    ('NACIONAL','ACTIVO',GETDATE()),
    ('LOCAL','ACTIVO',GETDATE());
END
GO

