
# LOVABLE AI DEVELOPMENT RULES

## STRICT GUIDELINES TO FOLLOW

### 1. DIRECTORY STRUCTURE
- **ALLOWED directory**: Contains all UI components, pages, and routes that can be freely modified
- **RESTRICTED directory**: Contains core configuration, services, types, and business logic
- **NEVER modify files in the restricted directory without explicit permission**
- **ALWAYS use the hybrid approach for environment variables**

### 2. ENVIRONMENT VARIABLES (HYBRID APPROACH)
- **Production**: Use environment variables (VITE_API_BASE_URL, VITE_API_KEY, etc.)
- **Development**: Fall back to localStorage configuration via ConfigService
- **NEVER hardcode secrets in the codebase**
- **ALWAYS check environment variables first, then localStorage**

### 3. API CONFIGURATION
- **USE ConfigService.getApiConfig() for all API calls**
- **IMPLEMENT proper error handling with fallback to mock data**
- **LOG all API attempts for debugging**
- **RESPECT rate limits and implement proper retry logic**

### 4. COMPONENT ARCHITECTURE
- **CREATE small, focused components (max 50 lines)**
- **USE TypeScript interfaces from restricted/types/**
- **IMPLEMENT proper error boundaries**
- **FOLLOW the established theme system**

### 5. DATA FLOW
- **USE React Query for all API calls**
- **IMPLEMENT loading states with Skeleton components**
- **PROVIDE meaningful error messages**
- **MAINTAIN consistent data transformation patterns**

### 6. SECURITY PRACTICES
- **NEVER expose API keys in client-side code**
- **USE proper authentication headers**
- **VALIDATE all user inputs**
- **SANITIZE data before display**

### 7. PERFORMANCE GUIDELINES
- **IMPLEMENT lazy loading for large components**
- **USE proper memoization where needed**
- **OPTIMIZE bundle size**
- **CACHE API responses appropriately**

### 8. CODE QUALITY
- **MAINTAIN consistent naming conventions**
- **WRITE self-documenting code**
- **IMPLEMENT proper TypeScript types**
- **FOLLOW established patterns and conventions**

### 9. DEPLOYMENT CONSIDERATIONS
- **ENSURE environment variables are properly configured**
- **TEST both development and production scenarios**
- **IMPLEMENT proper build optimizations**
- **PROVIDE clear deployment documentation**

### 10. FORBIDDEN ACTIONS
- **DO NOT modify core configuration without explicit approval**
- **DO NOT bypass the hybrid configuration system**
- **DO NOT hardcode API endpoints or secrets**
- **DO NOT break existing functionality when adding features**

## EMERGENCY PROTOCOLS
If the application breaks:
1. Check environment variable configuration first
2. Verify ConfigService is properly initialized
3. Ensure mock data fallback is working
4. Review console logs for specific errors
5. Test with minimal configuration

## DEPLOYMENT CHECKLIST
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Error handling verified
- [ ] Mock data fallback working
- [ ] Performance optimized
- [ ] Security reviewed
