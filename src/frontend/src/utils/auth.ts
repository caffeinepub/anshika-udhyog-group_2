// Simple password hashing using btoa (browser-compatible)
export function hashPassword(password: string): string {
  // Simple but consistent hash for browser environment
  let hash = 0;
  const str = `${password}aug_salt_2026`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return btoa(Math.abs(hash).toString() + str.length.toString());
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export interface SessionUser {
  userId: string;
  role: string;
  name: string;
  email: string;
}

export function getSession(): SessionUser | null {
  try {
    const raw = sessionStorage.getItem("aug_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(user: SessionUser): void {
  sessionStorage.setItem("aug_session", JSON.stringify(user));
}

export function clearSession(): void {
  sessionStorage.removeItem("aug_session");
}

export function getRoleRedirect(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "center":
      return "/center/dashboard";
    case "supervisor":
      return "/supervisor/dashboard";
    case "transport":
      return "/transport/dashboard";
    case "hr":
      return "/hr/dashboard";
    case "franchise":
      return "/franchise-partner/dashboard";
    default:
      return "/user/dashboard";
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateMemberId(): string {
  return `AUG${Date.now().toString().slice(-8)}`;
}

export function generateRefNumber(prefix = "AUG"): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}/${year}/${num}`;
}
