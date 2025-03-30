const requiredEnvs = ["NEXT_PUBLIC_API_URL", "NEXT_PUBLIC_SESSION_KEY"] as const;

export function validateEnvs() {
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

  if (missingEnvs.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvs.join(", ")}`);
  }
}
