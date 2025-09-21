package com.proyectosena.spring.app1.backend.config;

@Configuration
public class DriveConfig {

    @Value("${drive.service-account.json}")
    private String serviceAccountJsonPath;

    @Value("${drive.app-name}")
    private String appName;

    @Bean
    public Drive driveService() throws Exception {
        final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

        GoogleCredentials credentials = ServiceAccountCredentials
                .fromStream(new FileInputStream(serviceAccountJsonPath))
                .createScoped(Collections.singleton(DriveScopes.DRIVE_FILE));

        return new Drive.Builder(httpTransport, GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials))
                .setApplicationName(appName)
                .build();
    }
}