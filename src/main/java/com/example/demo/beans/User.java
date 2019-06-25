package com.example.demo.beans;





import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.time.Instant;

@Entity
@Table ( name  = "users")

public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


 
    @Column(name = "password_hash", length = 60)
    private String password;
    @Column(name = "name", length = 60)
    private String name;
    
    @Column(name="email")
    private String email;
    
    
    @Column(name="lastUpdate")
    private Date lastUpdate;
    
    @Lob
    private byte[] avatar;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	

	public byte[] getAvatar() {
		return avatar;
	}

	public void setAvatar(byte[] avatarUrl) {
		this.avatar = avatarUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
    

}
