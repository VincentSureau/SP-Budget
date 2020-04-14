<?php

namespace Appbudget\Models;

use PDO;
use Appbudget\Utils\Database;
use Appbudget\Models\CoreModel;

class OperationModel extends CoreModel {
    protected $id;
    
    protected $amount;
    
    protected $date;
    
    protected $comment;
    
    protected $paymentMethod;

    protected $paymentMethodId;
    
    protected $category;

    protected $categoryId;

    protected $userId;

    protected $createdAt;

    protected $updatedAt;

    protected $totalAmount;
    
    const TABLE_NAME = 'operation';
    
    public static function find($id){
        $sql = 'SELECT
        `operation`.`id`,
        `operation`.`amount`,
        `operation`.`payment_method_id` AS paymentMethodId,
        `operation`.`user_id` AS userId,
        `operation`.`category_id` AS categoryId,
        `operation`.`date`,
        `operation`.`comment`,
        `category`.`name` AS category,
        `payment_method`.`name` AS paymentMethod
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `category` ON `category`.`id` = `operation`.`category_id` 
        INNER JOIN `payment_method` ON `payment_method`.`id` = `operation`.`payment_method_id`
        WHERE `operation`.`id` = :id
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
        `operation`.`id`,
        `operation`.`amount`,
        `operation`.`payment_method_id` AS paymentMethodId,
        `operation`.`user_id` AS userId,
        `operation`.`category_id` AS categoryId,
        `operation`.`date`,
        `operation`.`comment`,
        `category`.`name` AS category,
        `payment_method`.`name` AS paymentMethod
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `category` ON `category`.`id` = `operation`.`category_id`
        INNER JOIN `payment_method` ON `payment_method`.`id` = `operation`.`payment_method_id`
        ORDER BY date DESC
        ';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->query($sql);
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public static function findByUser($userId){
        $sql = 'SELECT
        `operation`.`id`,
        `operation`.`amount` * `accounting_type`.`coefficient` AS amount,
        `operation`.`payment_method_id` AS paymentMethodId,
        `operation`.`user_id` AS userId,
        `operation`.`category_id` AS categoryId,
        `operation`.`date`,
        `operation`.`comment`,
        `category`.`name` AS category,
        `payment_method`.`name` AS paymentMethod
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `category` ON `category`.`id` = `operation`.`category_id`
        INNER JOIN `payment_method` ON `payment_method`.`id` = `operation`.`payment_method_id`
        INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        WHERE `operation`.`user_id` = :userId
        ORDER BY date DESC
        ';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public static function findByUserAndId($userId, $id){
        $sql = 'SELECT
        `operation`.`id`,
        `operation`.`amount`,
        `operation`.`payment_method_id` AS paymentMethodId,
        `operation`.`user_id` AS userId,
        `operation`.`category_id` AS categoryId,
        `operation`.`date`,
        `operation`.`comment`,
        `category`.`name` AS category,
        `payment_method`.`name` AS paymentMethod
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `category` ON `category`.`id` = `operation`.`category_id`
        INNER JOIN `payment_method` ON `payment_method`.`id` = `operation`.`payment_method_id`
        WHERE `category`.`id` = :id
        AND `user`.id`= :userId
        ';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchObject(static::class);
        return $result;   
    }
    
    public function insert() {
        $sql = '
        INSERT INTO ' . self::TABLE_NAME . ' (
        `payment_method_id`
        ,`user_id`
        ,`category_id`
        ,`amount`
        ,`date`
        ,`comment`
        ,`created_at`
        ,`updated_at`
        )
        VALUES (
        :paymentMethodId
        ,:userId
        ,:categoryId
        ,:amount
        ,:date
        ,:comment
        ,NOW()
        ,NOW()
        )
        ';

        $pdo = Database::getPDO();

        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindParam(':paymentMethodId', $this->paymentMethodId, PDO::PARAM_INT);
        $pdoStatement->bindParam(':userId', $this->userId, PDO::PARAM_INT);
        $pdoStatement->bindParam(':categoryId', $this->categoryId, PDO::PARAM_INT);
        $pdoStatement->bindParam(':amount', $this->amount, PDO::PARAM_STR);
        $sqlDate = $this->date->format("Y-m-d H:i:s");
        $pdoStatement->bindParam(':date', $sqlDate, PDO::PARAM_STR);
        $pdoStatement->bindParam(':comment', $this->comment, PDO::PARAM_STR);
        $updateDate = new \DateTime('now');

        $pdoStatement->execute();
        
        $insertedRow = $pdoStatement->rowCount();
        
        if($insertedRow < 1 ){
            return false;
        }
        
        $this->id = $pdo->lastInsertId();
        return true;
    }

    public static function findTotalStatByUser($userId, $startDate, $endDate){
        $sql = 'SELECT 
        SUM(`operation`.`amount` * `accounting_type`.`coefficient`) AS totalAmount
        FROM ' . static::TABLE_NAME .
        ' INNER JOIN `category` ON `operation`.`category_id` = `category`.`id`
        INNER JOIN `accounting_type` ON `category`.`accounting_type_id` = `accounting_type`.`id`
        WHERE `operation`.`user_id` = :userId
        AND `operation`.`date` >= :startDate
        AND `operation`.`date` <= :endDate
        ';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->bindValue(':startDate', $startDate, PDO::PARAM_STR);
        $pdoStatement->bindValue(':endDate', $endDate, PDO::PARAM_STR);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchObject(static::class);
        return $result;   
    }
    
    protected function update() {
        // toDo
    }   

    /**
     * Get the value of createdAt
     */ 
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set the value of createdAt
     *
     * @return  self
     */ 
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get the value of updatedAt
     */ 
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set the value of updatedAt
     *
     * @return  self
     */ 
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @return  self
     */ 
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get the value of category
     */ 
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set the value of category
     *
     * @return  self
     */ 
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get the value of paymentMethod
     */ 
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }

    /**
     * Set the value of paymentMethod
     *
     * @return  self
     */ 
    public function setPaymentMethod($paymentMethod)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * Get the value of amount
     */ 
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set the value of amount
     *
     * @return  self
     */ 
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get the value of comment
     */ 
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set the value of comment
     *
     * @return  self
     */ 
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get the value of userId
     */ 
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set the value of userId
     *
     * @return  self
     */ 
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get the value of paymentMethodId
     */ 
    public function getPaymentMethodId()
    {
        return $this->paymentMethodId;
    }

    /**
     * Set the value of paymentMethodId
     *
     * @return  self
     */ 
    public function setPaymentMethodId($paymentMethodId)
    {
        $this->paymentMethodId = $paymentMethodId;

        return $this;
    }

    /**
     * Get the value of categoryId
     */ 
    public function getCategoryId()
    {
        return $this->categoryId;
    }

    /**
     * Set the value of categoryId
     *
     * @return  self
     */ 
    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;

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
}