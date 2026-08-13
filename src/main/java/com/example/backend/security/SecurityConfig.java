package com.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    

   @Autowired
  private JwtFilter jwtFilter;  

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http.csrf(csrf -> csrf.disable());

        http.authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/login", "/api/register").permitAll()

                    .requestMatchers(HttpMethod.PUT, "/api/courses/**").hasRole("ADMIN")
                    
                    .requestMatchers(HttpMethod.DELETE, "/api/courses/**").permitAll()
                    
                      .anyRequest().authenticated()
        );

        http.addFilterBefore(
        jwtFilter,
        UsernamePasswordAuthenticationFilter.class
);

        return http.build();    
    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){

        DaoAuthenticationProvider provider= new DaoAuthenticationProvider(customUserDetailsService);

       

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config) throws Exception{
            return config.getAuthenticationManager();
            
        }

        
    
}