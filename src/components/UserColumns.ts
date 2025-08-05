import { ColumnDef } from "@tanstack/react-table"
import { UserRow } from "@/lib/data"

export const userColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "signUpDate",
    header: "Sign Up Date"
  }
]
