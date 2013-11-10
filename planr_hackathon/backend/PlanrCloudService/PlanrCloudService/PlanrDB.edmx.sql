
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 11/09/2013 13:35:21
-- Generated from EDMX file: C:\xampp\htdocs\planr\planr_hackathon\backend\PlanrCloudService\PlanrCloudService\PlanrDB.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [PlanrDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_coll_event]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[collaborators] DROP CONSTRAINT [FK_coll_event];
GO
IF OBJECT_ID(N'[dbo].[FK_Comments_Person]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[collaborators] DROP CONSTRAINT [FK_Comments_Person];
GO
IF OBJECT_ID(N'[dbo].[fk_conn_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[connections] DROP CONSTRAINT [fk_conn_user];
GO
IF OBJECT_ID(N'[dbo].[fk_date_sugg]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[date_suggestions] DROP CONSTRAINT [fk_date_sugg];
GO
IF OBJECT_ID(N'[dbo].[fk_events_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[events] DROP CONSTRAINT [fk_events_user];
GO
IF OBJECT_ID(N'[dbo].[fk_idea_sugg]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[idea_suggestions] DROP CONSTRAINT [fk_idea_sugg];
GO
IF OBJECT_ID(N'[dbo].[fk_likes_sugg]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_likes] DROP CONSTRAINT [fk_likes_sugg];
GO
IF OBJECT_ID(N'[dbo].[fk_likes_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_likes] DROP CONSTRAINT [fk_likes_user];
GO
IF OBJECT_ID(N'[dbo].[fk_not_notify]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_notifications] DROP CONSTRAINT [fk_not_notify];
GO
IF OBJECT_ID(N'[dbo].[fk_not_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_notifications] DROP CONSTRAINT [fk_not_user];
GO
IF OBJECT_ID(N'[dbo].[fk_notify_event]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[notifications] DROP CONSTRAINT [fk_notify_event];
GO
IF OBJECT_ID(N'[dbo].[fk_notify_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[notifications] DROP CONSTRAINT [fk_notify_user];
GO
IF OBJECT_ID(N'[dbo].[fk_sugg_event]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[suggestions] DROP CONSTRAINT [fk_sugg_event];
GO
IF OBJECT_ID(N'[dbo].[fk_sugg_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[suggestions] DROP CONSTRAINT [fk_sugg_user];
GO
IF OBJECT_ID(N'[dbo].[fk_task_event]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tasks] DROP CONSTRAINT [fk_task_event];
GO
IF OBJECT_ID(N'[dbo].[fk_task_user]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tasks] DROP CONSTRAINT [fk_task_user];
GO
IF OBJECT_ID(N'[dbo].[fk_tasks_tasks]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_tasks] DROP CONSTRAINT [fk_tasks_tasks];
GO
IF OBJECT_ID(N'[dbo].[fk_tasks_userid]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[user_tasks] DROP CONSTRAINT [fk_tasks_userid];
GO
IF OBJECT_ID(N'[dbo].[fk_time_sugg]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[time_suggestions] DROP CONSTRAINT [fk_time_sugg];
GO
IF OBJECT_ID(N'[dbo].[fk_venue_sugg]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[venue_suggestions] DROP CONSTRAINT [fk_venue_sugg];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[collaborators]', 'U') IS NOT NULL
    DROP TABLE [dbo].[collaborators];
GO
IF OBJECT_ID(N'[dbo].[connections]', 'U') IS NOT NULL
    DROP TABLE [dbo].[connections];
GO
IF OBJECT_ID(N'[dbo].[date_suggestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[date_suggestions];
GO
IF OBJECT_ID(N'[dbo].[events]', 'U') IS NOT NULL
    DROP TABLE [dbo].[events];
GO
IF OBJECT_ID(N'[dbo].[idea_suggestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[idea_suggestions];
GO
IF OBJECT_ID(N'[dbo].[notifications]', 'U') IS NOT NULL
    DROP TABLE [dbo].[notifications];
GO
IF OBJECT_ID(N'[dbo].[suggestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[suggestions];
GO
IF OBJECT_ID(N'[dbo].[tasks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tasks];
GO
IF OBJECT_ID(N'[dbo].[time_suggestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[time_suggestions];
GO
IF OBJECT_ID(N'[dbo].[user_likes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[user_likes];
GO
IF OBJECT_ID(N'[dbo].[user_notifications]', 'U') IS NOT NULL
    DROP TABLE [dbo].[user_notifications];
GO
IF OBJECT_ID(N'[dbo].[user_tasks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[user_tasks];
GO
IF OBJECT_ID(N'[dbo].[users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[users];
GO
IF OBJECT_ID(N'[dbo].[venue_suggestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[venue_suggestions];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'collaborators'
CREATE TABLE [dbo].[collaborators] (
    [id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NOT NULL,
    [event_id] int  NOT NULL,
    [user_role] int  NOT NULL,
    [status] int  NOT NULL
);
GO

-- Creating table 'connections'
CREATE TABLE [dbo].[connections] (
    [id] int IDENTITY(1,1) NOT NULL,
    [connection_id] int  NOT NULL,
    [user_id] int  NOT NULL,
    [created] datetime  NOT NULL,
    [status] int  NOT NULL
);
GO

-- Creating table 'date_suggestions'
CREATE TABLE [dbo].[date_suggestions] (
    [id] int IDENTITY(1,1) NOT NULL,
    [suggestion_id] int  NOT NULL,
    [date] datetime  NOT NULL
);
GO

-- Creating table 'events'
CREATE TABLE [dbo].[events] (
    [id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(50)  NOT NULL,
    [user_id] int  NOT NULL,
    [venue] nvarchar(50)  NULL,
    [time] time  NULL,
    [date] datetime  NULL,
    [code] nvarchar(10)  NOT NULL,
    [type] int  NOT NULL,
    [invite_type] int  NOT NULL
);
GO

-- Creating table 'idea_suggestions'
CREATE TABLE [dbo].[idea_suggestions] (
    [id] int IDENTITY(1,1) NOT NULL,
    [suggestion_id] int  NOT NULL,
    [idea] nvarchar(150)  NOT NULL,
    [photo] nvarchar(50)  NULL
);
GO

-- Creating table 'notifications'
CREATE TABLE [dbo].[notifications] (
    [id] int IDENTITY(1,1) NOT NULL,
    [user_id] int  NOT NULL,
    [created] datetime  NOT NULL,
    [text] nvarchar(50)  NULL,
    [event_id] int  NOT NULL,
    [code] int  NOT NULL
);
GO

-- Creating table 'suggestions'
CREATE TABLE [dbo].[suggestions] (
    [id] int IDENTITY(1,1) NOT NULL,
    [event_id] int  NOT NULL,
    [user_id] int  NOT NULL,
    [created] datetime  NOT NULL,
    [status] int  NOT NULL
);
GO

-- Creating table 'tasks'
CREATE TABLE [dbo].[tasks] (
    [id] int IDENTITY(1,1) NOT NULL,
    [event_id] int  NOT NULL,
    [user_id] int  NOT NULL,
    [created] datetime  NOT NULL,
    [description] nvarchar(150)  NOT NULL,
    [deadline] datetime  NOT NULL,
    [type] int  NOT NULL,
    [priority] int  NOT NULL
);
GO

-- Creating table 'time_suggestions'
CREATE TABLE [dbo].[time_suggestions] (
    [id] int IDENTITY(1,1) NOT NULL,
    [suggestion_id] int  NOT NULL,
    [time] time  NOT NULL
);
GO

-- Creating table 'user_likes'
CREATE TABLE [dbo].[user_likes] (
    [user_id] int  NOT NULL,
    [suggestion_id] int  NOT NULL,
    [type] int  NOT NULL
);
GO

-- Creating table 'user_tasks'
CREATE TABLE [dbo].[user_tasks] (
    [id] int IDENTITY(1,1) NOT NULL,
    [task_id] int  NOT NULL,
    [user_id] int  NOT NULL,
    [status] int  NOT NULL,
    [completed_on] datetime  NULL
);
GO

-- Creating table 'users'
CREATE TABLE [dbo].[users] (
    [id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(50)  NOT NULL,
    [email] nvarchar(50)  NOT NULL,
    [password] nvarchar(50)  NOT NULL,
    [fb_token] nvarchar(50)  NULL
);
GO

-- Creating table 'venue_suggestions'
CREATE TABLE [dbo].[venue_suggestions] (
    [id] int IDENTITY(1,1) NOT NULL,
    [suggestion_id] int  NOT NULL,
    [coordinates] nvarchar(50)  NULL,
    [photo] nvarchar(50)  NULL,
    [venue] nvarchar(50)  NULL,
    [address] nvarchar(50)  NULL,
    [description] nvarchar(50)  NULL
);
GO

-- Creating table 'user_notifications'
CREATE TABLE [dbo].[user_notifications] (
    [notifications1_id] int  NOT NULL,
    [users_id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [id] in table 'collaborators'
ALTER TABLE [dbo].[collaborators]
ADD CONSTRAINT [PK_collaborators]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'connections'
ALTER TABLE [dbo].[connections]
ADD CONSTRAINT [PK_connections]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'date_suggestions'
ALTER TABLE [dbo].[date_suggestions]
ADD CONSTRAINT [PK_date_suggestions]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'events'
ALTER TABLE [dbo].[events]
ADD CONSTRAINT [PK_events]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'idea_suggestions'
ALTER TABLE [dbo].[idea_suggestions]
ADD CONSTRAINT [PK_idea_suggestions]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'notifications'
ALTER TABLE [dbo].[notifications]
ADD CONSTRAINT [PK_notifications]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'suggestions'
ALTER TABLE [dbo].[suggestions]
ADD CONSTRAINT [PK_suggestions]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'tasks'
ALTER TABLE [dbo].[tasks]
ADD CONSTRAINT [PK_tasks]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'time_suggestions'
ALTER TABLE [dbo].[time_suggestions]
ADD CONSTRAINT [PK_time_suggestions]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [user_id], [suggestion_id] in table 'user_likes'
ALTER TABLE [dbo].[user_likes]
ADD CONSTRAINT [PK_user_likes]
    PRIMARY KEY CLUSTERED ([user_id], [suggestion_id] ASC);
GO

-- Creating primary key on [id] in table 'user_tasks'
ALTER TABLE [dbo].[user_tasks]
ADD CONSTRAINT [PK_user_tasks]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [PK_users]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'venue_suggestions'
ALTER TABLE [dbo].[venue_suggestions]
ADD CONSTRAINT [PK_venue_suggestions]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [notifications1_id], [users_id] in table 'user_notifications'
ALTER TABLE [dbo].[user_notifications]
ADD CONSTRAINT [PK_user_notifications]
    PRIMARY KEY NONCLUSTERED ([notifications1_id], [users_id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [event_id] in table 'collaborators'
ALTER TABLE [dbo].[collaborators]
ADD CONSTRAINT [FK_coll_event]
    FOREIGN KEY ([event_id])
    REFERENCES [dbo].[events]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_coll_event'
CREATE INDEX [IX_FK_coll_event]
ON [dbo].[collaborators]
    ([event_id]);
GO

-- Creating foreign key on [user_id] in table 'collaborators'
ALTER TABLE [dbo].[collaborators]
ADD CONSTRAINT [FK_Comments_Person]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_Comments_Person'
CREATE INDEX [IX_FK_Comments_Person]
ON [dbo].[collaborators]
    ([user_id]);
GO

-- Creating foreign key on [user_id] in table 'connections'
ALTER TABLE [dbo].[connections]
ADD CONSTRAINT [fk_conn_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_conn_user'
CREATE INDEX [IX_fk_conn_user]
ON [dbo].[connections]
    ([user_id]);
GO

-- Creating foreign key on [suggestion_id] in table 'date_suggestions'
ALTER TABLE [dbo].[date_suggestions]
ADD CONSTRAINT [fk_date_sugg]
    FOREIGN KEY ([suggestion_id])
    REFERENCES [dbo].[suggestions]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_date_sugg'
CREATE INDEX [IX_fk_date_sugg]
ON [dbo].[date_suggestions]
    ([suggestion_id]);
GO

-- Creating foreign key on [user_id] in table 'events'
ALTER TABLE [dbo].[events]
ADD CONSTRAINT [fk_events_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_events_user'
CREATE INDEX [IX_fk_events_user]
ON [dbo].[events]
    ([user_id]);
GO

-- Creating foreign key on [event_id] in table 'notifications'
ALTER TABLE [dbo].[notifications]
ADD CONSTRAINT [fk_notify_event]
    FOREIGN KEY ([event_id])
    REFERENCES [dbo].[events]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_notify_event'
CREATE INDEX [IX_fk_notify_event]
ON [dbo].[notifications]
    ([event_id]);
GO

-- Creating foreign key on [event_id] in table 'suggestions'
ALTER TABLE [dbo].[suggestions]
ADD CONSTRAINT [fk_sugg_event]
    FOREIGN KEY ([event_id])
    REFERENCES [dbo].[events]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_sugg_event'
CREATE INDEX [IX_fk_sugg_event]
ON [dbo].[suggestions]
    ([event_id]);
GO

-- Creating foreign key on [event_id] in table 'tasks'
ALTER TABLE [dbo].[tasks]
ADD CONSTRAINT [fk_task_event]
    FOREIGN KEY ([event_id])
    REFERENCES [dbo].[events]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_task_event'
CREATE INDEX [IX_fk_task_event]
ON [dbo].[tasks]
    ([event_id]);
GO

-- Creating foreign key on [suggestion_id] in table 'idea_suggestions'
ALTER TABLE [dbo].[idea_suggestions]
ADD CONSTRAINT [fk_idea_sugg]
    FOREIGN KEY ([suggestion_id])
    REFERENCES [dbo].[suggestions]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_idea_sugg'
CREATE INDEX [IX_fk_idea_sugg]
ON [dbo].[idea_suggestions]
    ([suggestion_id]);
GO

-- Creating foreign key on [user_id] in table 'notifications'
ALTER TABLE [dbo].[notifications]
ADD CONSTRAINT [fk_notify_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_notify_user'
CREATE INDEX [IX_fk_notify_user]
ON [dbo].[notifications]
    ([user_id]);
GO

-- Creating foreign key on [suggestion_id] in table 'user_likes'
ALTER TABLE [dbo].[user_likes]
ADD CONSTRAINT [fk_likes_sugg]
    FOREIGN KEY ([suggestion_id])
    REFERENCES [dbo].[suggestions]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_likes_sugg'
CREATE INDEX [IX_fk_likes_sugg]
ON [dbo].[user_likes]
    ([suggestion_id]);
GO

-- Creating foreign key on [user_id] in table 'suggestions'
ALTER TABLE [dbo].[suggestions]
ADD CONSTRAINT [fk_sugg_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_sugg_user'
CREATE INDEX [IX_fk_sugg_user]
ON [dbo].[suggestions]
    ([user_id]);
GO

-- Creating foreign key on [suggestion_id] in table 'time_suggestions'
ALTER TABLE [dbo].[time_suggestions]
ADD CONSTRAINT [fk_time_sugg]
    FOREIGN KEY ([suggestion_id])
    REFERENCES [dbo].[suggestions]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_time_sugg'
CREATE INDEX [IX_fk_time_sugg]
ON [dbo].[time_suggestions]
    ([suggestion_id]);
GO

-- Creating foreign key on [suggestion_id] in table 'venue_suggestions'
ALTER TABLE [dbo].[venue_suggestions]
ADD CONSTRAINT [fk_venue_sugg]
    FOREIGN KEY ([suggestion_id])
    REFERENCES [dbo].[suggestions]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_venue_sugg'
CREATE INDEX [IX_fk_venue_sugg]
ON [dbo].[venue_suggestions]
    ([suggestion_id]);
GO

-- Creating foreign key on [user_id] in table 'tasks'
ALTER TABLE [dbo].[tasks]
ADD CONSTRAINT [fk_task_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_task_user'
CREATE INDEX [IX_fk_task_user]
ON [dbo].[tasks]
    ([user_id]);
GO

-- Creating foreign key on [task_id] in table 'user_tasks'
ALTER TABLE [dbo].[user_tasks]
ADD CONSTRAINT [fk_tasks_tasks]
    FOREIGN KEY ([task_id])
    REFERENCES [dbo].[tasks]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_tasks_tasks'
CREATE INDEX [IX_fk_tasks_tasks]
ON [dbo].[user_tasks]
    ([task_id]);
GO

-- Creating foreign key on [task_id] in table 'user_tasks'
ALTER TABLE [dbo].[user_tasks]
ADD CONSTRAINT [fk_tasks_userid]
    FOREIGN KEY ([task_id])
    REFERENCES [dbo].[tasks]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'fk_tasks_userid'
CREATE INDEX [IX_fk_tasks_userid]
ON [dbo].[user_tasks]
    ([task_id]);
GO

-- Creating foreign key on [user_id] in table 'user_likes'
ALTER TABLE [dbo].[user_likes]
ADD CONSTRAINT [fk_likes_user]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [notifications1_id] in table 'user_notifications'
ALTER TABLE [dbo].[user_notifications]
ADD CONSTRAINT [FK_user_notifications_notifications]
    FOREIGN KEY ([notifications1_id])
    REFERENCES [dbo].[notifications]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [users_id] in table 'user_notifications'
ALTER TABLE [dbo].[user_notifications]
ADD CONSTRAINT [FK_user_notifications_users]
    FOREIGN KEY ([users_id])
    REFERENCES [dbo].[users]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_user_notifications_users'
CREATE INDEX [IX_FK_user_notifications_users]
ON [dbo].[user_notifications]
    ([users_id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------