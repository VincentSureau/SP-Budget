<?php

namespace Appbudget\Models;

use PDO;
use Appbudget\Utils\Database;
use Appbudget\Models\CoreModel;

class CategoryModel extends CoreModel {

    protected $id;
    
    protected $name;
    
    protected $accountingType;

    protected $accountingTypeId;

    protected $accountingTypeCoefficient;

    protected $totalAmount;
        
    const TABLE_NAME = 'category';
    
    public static function find($id){
        $sql = 'SELECT
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`id` AS accountingTypeId,
        `accounting_type`.`type` AS accountingType
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id` 
        WHERE `category`.`id` = :id
        ';
        
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();
        
        $result = $pdoStatement->fetchObject(static::class);
        return $result;  
    }
    
    public static function findAll(){
        $sql = 'SELECT 
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`id` AS accountingTypeId,
        `accounting_type`.`type` AS accountingType
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        ORDER BY id ASC';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->query($sql);
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public static function findByType($operation_type = "expense"){
        $sql = 'SELECT 
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`id` AS accountingTypeId,
        `accounting_type`.`type` AS accountingType
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        WHERE `accounting_type`.`type` = :operation_type
        ORDER BY id ASC';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':operation_type', $operation_type, PDO::PARAM_STR);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;
    }
    
    public static function findAllStatByUser($userId, $startDate, $endDate){
        $sql = 'SELECT 
        `category`.`id`,
        `category`.`name`,
        `accounting_type`.`coefficient` AS accountingTypeCoefficient,
        SUM(`operation`.`amount`) AS totalAmount
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        INNER JOIN `operation` ON `operation`.`category_id` = `category`.`id`
        WHERE `operation`.`user_id` = :userId
        AND `operation`.`date` >= :startDate
        AND `operation`.`date` <= :endDate
        GROUP BY `category`.`id`
        ORDER BY id ASC';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->bindValue(':startDate', $startDate, PDO::PARAM_STR);
        $pdoStatement->bindValue(':endDate', $endDate, PDO::PARAM_STR);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public function insert() {
        //toDo
    }
    
    protected function update() {
        // toDo
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of accountingType
     */ 
    public function getAccountingType()
    {
        return $this->accountingType;
    }

    /**
     * Set the value of accountingType
     *
     * @return  self
     */ 
    public function setAccountingType($accountingType)
    {
        $this->accountingType = $accountingType;

        return $this;
    }

    /**
     * Get the value of accountingTypeId
     */ 
    public function getAccountingTypeId()
    {
        return $this->accountingTypeId;
    }

    /**
     * Set the value of accountingTypeId
     *
     * @return  self
     */ 
    public function setAccountingTypeId($accountingTypeId)
    {
        $this->accountingTypeId = $accountingTypeId;

        return $this;
    }

    /**
     * Get the value of totalAmount
     */ 
    public function getTotalAmount()
    {
        return $this->totalAmount;
    }

    /**
     * Set the value of totalAmount
     *
     * @return  self
     */ 
    public function setTotalAmount($totalAmount)
    {
        $this->totalAmount = $totalAmount;

        return $this;
    }

    /**
     * Get the value of accountingTypeCoefficient
     */ 
    public function getAccountingTypeCoefficient()
    {
        return $this->accountingTypeCoefficient;
    }

    /**
     * Set the value of accountingTypeCoefficient
     *
     * @return  self
     */ 
    public function setAccountingTypeCoefficient($accountingTypeCoefficient)
    {
        $this->accountingTypeCoefficient = $accountingTypeCoefficient;

        return $this;
    }
}