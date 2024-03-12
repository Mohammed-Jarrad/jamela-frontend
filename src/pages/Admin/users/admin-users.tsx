import LimitController from '@/components/limit-controller'
import Flex from '@/components/my/flex'
import TablePaginationAndDetails from '@/components/table-pagination-and-details'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useChangeUserRoleAndStatus, useDeleteUser, useGetAllUsers } from '@/hooks/use-user'
import { Roles, StatusType, UserProps } from '@/types'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { BadgeCheck, CheckCircle, XOctagon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import AdminUsersDeleteDialog from './admin-users-delete-dialog'
import UsersTableFilters from './admin-users-filters'
const sortItems = [
    { value: 'name', label: 'Name, A-Z' },
    { value: '-name', label: 'Name, Z-A' },
    { value: 'createdAt', label: 'Date, oldest' },
    { value: '-createdAt', label: 'Date, newest' },
    { value: 'status', label: 'Status, A-Z' },
    { value: '-status', label: 'Status, Z-A' },
]

const AdminUsers = () => {
    // states
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string>()
    const [sort, setSort] = useState<string>()
    // queries and mutations
    const { data, isLoading, error } = useGetAllUsers({
        page,
        limit,
        ...(search && { search }),
        ...(sort && { sort }),
        select: 'username, email, status, image, createdAt, role, confirmEmail, phone, address, gender',
    })
    const { mutate: changePermissions, isPending: isChanging } = useChangeUserRoleAndStatus()
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()
    const handleErrors = useHandleErrors()
    const pagesCount = data ? Math.ceil(data?.totalResultsCounts / limit) : 0

    type ChangePermissions = { userId: UserProps['_id']; role?: Roles; status?: StatusType }
    function changeUserPermissions({ role, status, userId }: ChangePermissions) {
        changePermissions({ userId, role, status })
    }

    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (error) handleErrors(error)
    return (
        <Transition>
            <Helmet>
                <title>Admin Users</title>
            </Helmet>

            {/* search users and refresh and create link and sort */}
            <UsersTableFilters
                sortItems={sortItems}
                search={search}
                sort={sort}
                setSort={setSort}
                onRefresh={() => {
                    setLimit(5)
                    setPage(1)
                    setSearch(undefined)
                    setSort(undefined)
                }}
                onSearch={(value) => {
                    setPage(1)
                    setSearch(value)
                }}
            />

            {data?.resultCount == 0 ? (
                <p className="text-center text-3xl font-bold">No Coupons Found</p>
            ) : (
                <>
                    {(isChanging || isDeleting) && (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    )}
                    {isLoading ? (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    ) : (
                        <>
                            <Table className="max-md:text-xs">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.users
                                        // .filter((user) => user._id !== currentUser._id)
                                        .map((user, index) => (
                                            <TableRow key={user._id}>
                                                <TableCell className="font-medium">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="capitalize">
                                                    <Flex align="center">
                                                        <img
                                                            src={user.image?.secure_url}
                                                            alt={user.username}
                                                            loading="lazy"
                                                            className="mr-3 h-8 w-8 rounded-full object-cover object-center"
                                                        />
                                                        {user.role == 'Admin' && (
                                                            <BadgeCheck
                                                                size={20}
                                                                color="white"
                                                                fill="green"
                                                            />
                                                        )}
                                                        <span
                                                            className="truncate"
                                                            title={user.username}
                                                        >
                                                            {user.username}
                                                        </span>
                                                    </Flex>
                                                </TableCell>
                                                <TableCell>
                                                    <Flex align="center">
                                                        <span>{user.email}</span>
                                                        {user.confirmEmail ? (
                                                            <CheckCircle size={15} color="green" />
                                                        ) : (
                                                            <XOctagon
                                                                size={15}
                                                                color="white"
                                                                fill="red"
                                                            />
                                                        )}
                                                    </Flex>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={user.role}
                                                        onValueChange={(value) =>
                                                            changeUserPermissions({
                                                                userId: user._id,
                                                                role: value as Roles,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger className="h-fit py-1">
                                                            <SelectValue placeholder="Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Admin">
                                                                Admin
                                                            </SelectItem>
                                                            <SelectItem value="User">
                                                                User
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell
                                                    className="data-[valid-false]:font-bold data-[valid=false]:text-red-500"
                                                    data-valid={!!user.phone}
                                                >
                                                    {user.phone || 'N/A'}
                                                </TableCell>
                                                <TableCell
                                                    className="truncate data-[valid-false]:font-bold data-[valid=false]:text-red-500"
                                                    data-valid={!!user.address}
                                                >
                                                    {user.address || 'N/A'}
                                                </TableCell>
                                                <TableCell
                                                    className="data-[valid-false]:font-bold data-[valid=false]:text-red-500"
                                                    data-valid={!!user.gender}
                                                >
                                                    {user.gender || 'N/A'}
                                                </TableCell>
                                                <TableCell className="w-[70px] text-center">
                                                    <Switch
                                                        checked={user.status == 'Active'}
                                                        onCheckedChange={(e) =>
                                                            changeUserPermissions({
                                                                userId: user._id,
                                                                status: e ? 'Active' : 'Inactive',
                                                            })
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className="w-[70px] text-center">
                                                    <AdminUsersDeleteDialog
                                                        onDelete={() => deleteUser(user._id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="w-full px-10">
                                        <TableCell colSpan={5} className="sticky left-0">
                                            <span className="block">Limit of records</span>
                                        </TableCell>
                                        <TableCell colSpan={4} className="sticky right-0">
                                            <LimitController
                                                limit={limit}
                                                totalResultsCounts={data?.totalResultsCounts ?? 0}
                                                setLimit={setLimit}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <TablePaginationAndDetails
                                currentPage={page}
                                itemsPerPage={limit}
                                onChange={(page) => setPage(page)}
                                pagesCount={pagesCount}
                                resultCount={data?.resultCount ?? 0}
                                totalCount={data?.totalCount ?? 0}
                                totalResultsCounts={data?.totalResultsCounts ?? 0}
                            />
                        </>
                    )}
                </>
            )}
        </Transition>
    )
}

export default AdminUsers
