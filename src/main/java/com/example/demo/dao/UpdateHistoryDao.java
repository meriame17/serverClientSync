package com.example.demo.dao;

import com.example.demo.beans.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

class UpdateHistoryDao extends JpaRepository<UpdatesHistory, Long>{

}
