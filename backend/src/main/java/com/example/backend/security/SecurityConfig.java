package com.example.backend.security;
// ye alg se add kia for fronend connection bad m
import java.util.List;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    

   @Autowired
  private JwtFilter jwtFilter;  

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http.csrf(csrf -> csrf.disable());

        // Pehle yahan koi CORS config nahi thi. @CrossOrigin("*") controller pe
        // laga hona kaafi nahi hai kyunki Spring Security browser ke OPTIONS
        // preflight request ko controller tak pahunchne se pehle hi
        // "unauthenticated" samajh kar block kar deta tha - isliye
        // "No 'Access-Control-Allow-Origin' header" wala error aata tha.
        http.cors(Customizer.withDefaults());


        // NEW: JWT is stateless, so don't use HTTP session
         http.sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );


        http.authorizeHttpRequests(auth -> auth
                    // Browser ka CORS preflight (OPTIONS) request kabhi
                    // Authorization header nahi bhejta, isliye use hamesha
                    // permitAll rakhna zaroori hai.
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                    .requestMatchers("/api/login", "/api/register").permitAll()

                    // Naye Admin/User accounts sirf existing Admin hi bana sake.
                    // ⚠️ TEMPORARY: pehla Admin Postman se banane ke liye ek baar
                    // permitAll kiya hai. Pehla Admin ban jaye to isse wapas
                    // .hasRole("ADMIN") kar dena (neeche comment mein hai).
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    // .requestMatchers("/api/admin/**").hasRole("ADMIN")

                    // Sirf Admin naya student/course add kar sake.
                    .requestMatchers(HttpMethod.POST, "/api/students", "/api/courses").hasRole("ADMIN")

                    // Sirf Admin student/course update kar sake.
                    .requestMatchers(HttpMethod.PUT, "/api/students/**", "/api/courses/**").hasRole("ADMIN")

                    // Sirf Admin student/course delete kar sake.
                    // (Pehle course delete sabke liye permitAll tha - bina login ke bhi
                    // koi delete kar sakta tha, ab wo bhi Admin-only kar diya.)
                    .requestMatchers(HttpMethod.DELETE, "/api/students/**", "/api/courses/**").hasRole("ADMIN")
                    
                      .anyRequest().authenticated()
        );

        // Pehle koi entry point define nahi tha, isliye galat username/password
        // dene par bhi Spring Security default "403 Forbidden" bhej deta tha -
        // jisse asli wajah (galat credentials) pata hi nahi chalti thi.
        // Ab clear 401 + message milega.
        http.exceptionHandling(ex -> ex.authenticationEntryPoint(
            (request, response, authException) -> {
                response.setContentType("application/json");
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("{\"message\":\"Invalid username or password\"}");
            }
        ));

        http.addFilterBefore(
        jwtFilter,
        UsernamePasswordAuthenticationFilter.class
);

        return http.build();    
    }

    // Frontend (Vite dev server, http://localhost:5173) se aane wali
    // requests ko allow karne ke liye CORS config yahan define kiya.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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