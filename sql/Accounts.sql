UPDATE `db`.`accounts`
SET
`Balance` = Balance - 1000
WHERE `AccNo` = 101;
UPDATE `db`.`accounts`
SET
`Balance` = Balance+1000
WHERE `AccNo` = 102;

commit
use db;
select * from accounts;



