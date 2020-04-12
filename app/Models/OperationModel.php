<?php

namespace Appbudget\Models;

use PDO;
use Appbudget\Utils\Database;
use Appbudget\Models\CoreModel;

class QuizModel extends CoreModel {
    protected $id;
    
    protected $amount;
    
    protected $date;
    
    protected $comment;
    
    protected $paymentMethod;
    
    protected $category;
    
    
    const TABLE_NAME = 'operation';
    
    public static function find($id){
        $sql = '';
        
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();
        
        $result = $pdoStatement->fetchObject(static::class);
        return $result;  
    }
    
    public static function findAll(){
        $sql = '';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->query($sql);
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public static function findByUser($userId){
        $sql = '';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchAll(PDO::FETCH_CLASS, static::class);
        return $result;   
    }
    
    public static function findByUserAndId($userId, $id){
        $sql = '';
        $pdo = Database::getPDO();
        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->bindValue(':userId', $userId, PDO::PARAM_INT);
        $pdoStatement->bindValue(':id', $id, PDO::PARAM_INT);
        $pdoStatement->execute();
        $result = $pdoStatement->fetchObject(static::class);
        return $result;   
    }
    
    public function insert() {
        $sql = '';
                
        $pdo = Database::getPDO();
        
        $pdoStatement = $pdo->prepare($sql);

        $pdoStatement->execute();
        
        $insertedRow = $pdoStatement->rowCount();
        
        if($insertedRow < 1 ){
            return false;
        }
        
        $this->id = $pdo->lastInsertId();
        return true;
    }
    
    protected function update() {
        // toDo
    }   
    
    /**
    * Get the value of title
    */ 
    public function getTitle()
    {
        return $this->title;
    }
    
    /**
    * Set the value of title
    *
    * @return  self
    */ 
    public function setTitle($title)
    {
        $this->title = $title;
        
        return $this;
    }
    
    /**
    * Get the value of description
    */ 
    public function getDescription()
    {
        return $this->description;
    }
    
    /**
    * Set the value of description
    *
    * @return  self
    */ 
    public function setDescription($description)
    {
        $this->description = $description;
        
        return $this;
    }
    
    /**
    * Get the value of authorId
    */ 
    public function getAuthorId()
    {
        return $this->authorId;
    }
    
    /**
    * Set the value of authorId
    *
    * @return  self
    */ 
    public function setAuthorId($authorId)
    {
        $this->authorId = $authorId;
        
        return $this;
    }
    
    /**
    * Get the value of authorFirstName
    */ 
    public function getAuthorFirstName()
    {
        return $this->authorFirstName;
    }
    
    /**
    * Set the value of authorFirstName
    *
    * @return  self
    */ 
    public function setAuthorFirstName($authorFirstName)
    {
        $this->authorFirstName = $authorFirstName;
        
        return $this;
    }
    
    /**
    * Get the value of authorLastName
    */ 
    public function getAuthorLastName()
    {
        return $this->authorLastName;
    }
    
    /**
    * Set the value of authorLastName
    *
    * @return  self
    */ 
    public function setAuthorLastName($authorLastName)
    {
        $this->authorLastName = $authorLastName;
        
        return $this;
    }
}