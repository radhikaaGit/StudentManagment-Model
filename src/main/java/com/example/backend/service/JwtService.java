package com.example.backend.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    private static final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey123456";


    private SecretKey getSigningKey(){
  
            return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

  
    } 

public String generateToken(String userName){


    return Jwts.builder()
    .subject(userName)
    .issuedAt(new Date())
    .expiration(new Date(System.currentTimeMillis() + 1000 *60 *60))
    .signWith(getSigningKey())
    .compact();


}

public String extractUserName(String token){

    Claims claims = Jwts.parser()
    .verifyWith(getSigningKey())
    .build()
    .parseSignedClaims(token)
    .getPayload();

    return claims.getSubject();
    

}

public boolean isTokenValid(String token, String userName) {

    return extractUserName(token).equals(userName);

}






}
