import { User } from "@/types/auth.types";

export const getUserFullName = (currentUser: User | null): string | null => {
  let name = currentUser?.firstName || null;

  if (currentUser?.lastName) {
    name += ` ${currentUser.lastName}`;
  }

  return name;
}

export const getUserInitials = (currentUser: User | null): string => {
  let initials = "";

  if (currentUser?.firstName) {
    initials += currentUser.firstName.charAt(0).toUpperCase();
  }

  if (currentUser?.lastName) {
    initials += currentUser.lastName.charAt(0).toUpperCase();
  } else if (currentUser?.firstName && currentUser.firstName.length > 1) {
    initials += currentUser?.firstName?.charAt(1).toUpperCase();
  }

  return initials || "US";
}