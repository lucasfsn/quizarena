package com.quizarena.gateway.configuration;


import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthHeaderFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        var authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authHeader != null) {
            exchange = exchange.mutate()
                    .request(exchange.getRequest()
                            .mutate()
                            .header("Authorization", authHeader)
                            .build())
                    .build();
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // early in the filter chain
    }
}