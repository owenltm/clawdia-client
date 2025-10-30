import { Button } from "@/components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/Dropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserContext } from "@/contexts/UserContext";
import useConfirmModal from "@/hooks/useConfirmModal";
import { getUserFullName, getUserInitials } from "@/lib/authUtils";
import { deleteUser } from "@/services/authService";
import { roles, User } from "@/types/auth.types";
import { RiMore2Fill } from "@remixicon/react";

export default function UserList({
  users
}: {
  users: User[];
}) {
  const { currentUser } = useAuthContext();
  const { updateFocusedUser, refreshData } = useUserContext();

  const { modal, open } = useConfirmModal({});

  const handleDeleteUser = async (userId: string) => {
    const response = await deleteUser(userId);

    if (response.success) {
      refreshData();
    }
  };

  return (<>
    {modal()}
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
    >
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between gap-x-6 py-2.5"
        >
          <div className="flex items-center gap-x-4 truncate">
            <span
              className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 sm:flex dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
              aria-hidden="true"
            >
              {getUserInitials(user)}
            </span>
            <div className="truncate">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                {getUserFullName(user)}
              </p>
              <p className="truncate text-xs text-gray-500">{user.email || "No Email"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              // defaultValue={user.role}
              value={user.role}
              onValueChange={(_value) => {
                // TODO: Update user role
              }}
              disabled={currentUser?.role != "admin"}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent align="end">
                {roles.map((role) => (
                  <SelectItem
                    key={role.value}
                    value={role.value}
                    disabled={role.value === "admin"}
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
                >
                  <RiMore2Fill
                    className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={() => updateFocusedUser(user)}
                  disabled={currentUser?.role !== "admin"}
                >
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-500"
                  onClick={() => {
                    open(() => {
                      handleDeleteUser(user.id.toString());
                    });
                  }}
                  disabled={currentUser?.role !== "admin"}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </li>
      ))}
    </ul >
  </>
  )
}