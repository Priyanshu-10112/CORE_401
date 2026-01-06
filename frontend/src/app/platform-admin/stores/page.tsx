"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    MapPin,
    Building2,
    Loader2,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { usePlatformStores, useUpdateStoreStatus, useCreateStore } from "@/hooks/use-platform-admin";
import { toast } from "sonner";

export default function StoresPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newStoreData, setNewStoreData] = useState({
        name: "",
        ownerName: "",
        email: "",
        license: "",
        location: ""
    });
    
    const { data: stores, isLoading, error } = usePlatformStores(statusFilter || undefined);
    const updateStoreStatus = useUpdateStoreStatus();
    const createStore = useCreateStore();

    const filteredStores = stores?.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.owner.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleStatusUpdate = async (storeId: number, newStatus: string) => {
        try {
            await updateStoreStatus.mutateAsync({ id: storeId, status: newStatus });
            toast.success(`Store status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update store status");
        }
    };

    const handleCreateStore = async () => {
        // Validate required fields
        const requiredFields = [
            { field: 'name', label: 'Store Name' },
            { field: 'ownerName', label: 'Owner Name' },
            { field: 'email', label: 'Email' },
            { field: 'license', label: 'License Number' },
            { field: 'location', label: 'Location' }
        ];

        const emptyFields = requiredFields.filter(({ field }) => !newStoreData[field as keyof typeof newStoreData].trim());
        
        if (emptyFields.length > 0) {
            toast.error(`Please fill in: ${emptyFields.map(f => f.label).join(', ')}`);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newStoreData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            await createStore.mutateAsync(newStoreData);
            toast.success("Store created successfully! It will be reviewed for approval.");
            setIsAddDialogOpen(false);
            setNewStoreData({
                name: "",
                ownerName: "",
                email: "",
                license: "",
                location: ""
            });
        } catch (error: any) {
            console.error('Create store error:', error);
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to create store";
            toast.error(errorMessage);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewStoreData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Failed to load stores</p>
                    <p className="text-slate-500 text-sm mt-1">Please try again later</p>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pharmacy Partners</h1>
                    <p className="text-slate-500 font-medium mt-1">Review and approve pharmacy store registrations.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-bold border-slate-200">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-500/20">
                                <Plus className="mr-2 h-4 w-4" />
                                Manual Registration
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Manual Store Registration</DialogTitle>
                                <DialogDescription>
                                    Register a pharmacy store manually (for special cases). 
                                    <br />
                                    <span className="text-sm text-amber-600 font-medium">
                                        Note: Store owners can also register themselves at the registration page.
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Store Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newStoreData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="col-span-3"
                                        placeholder="Apollo Pharmacy"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="ownerName" className="text-right">
                                        Owner Name
                                    </Label>
                                    <Input
                                        id="ownerName"
                                        value={newStoreData.ownerName}
                                        onChange={(e) => handleInputChange("ownerName", e.target.value)}
                                        className="col-span-3"
                                        placeholder="Dr. Rajesh Kumar"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newStoreData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="col-span-3"
                                        placeholder="store@pharmacy.com"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="license" className="text-right">
                                        License No.
                                    </Label>
                                    <Input
                                        id="license"
                                        value={newStoreData.license}
                                        onChange={(e) => handleInputChange("license", e.target.value)}
                                        className="col-span-3"
                                        placeholder="DL-IND-1234"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="location" className="text-right">
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        value={newStoreData.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        className="col-span-3"
                                        placeholder="Vijay Nagar, Indore"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setNewStoreData({
                                            name: "",
                                            ownerName: "",
                                            email: "",
                                            license: "",
                                            location: ""
                                        });
                                    }}
                                    disabled={createStore.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    onClick={handleCreateStore}
                                    disabled={createStore.isPending}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {createStore.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Store"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name, license or location..."
                            className="pl-10 h-10 bg-white border-slate-200 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-bold uppercase tracking-wider text-xs text-slate-500 pl-6">Store Name</TableHead>
                            <TableHead className="font-bold uppercase tracking-wider text-xs text-slate-500">License</TableHead>
                            <TableHead className="font-bold uppercase tracking-wider text-xs text-slate-500">Location</TableHead>
                            <TableHead className="font-bold uppercase tracking-wider text-xs text-slate-500">Status</TableHead>
                            <TableHead className="font-bold uppercase tracking-wider text-xs text-slate-500 text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-slate-500">Loading stores...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredStores.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <div className="text-slate-500">
                                        {searchTerm ? "No stores found matching your search" : "No stores registered yet"}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredStores.map((store) => (
                                <TableRow key={store.id} className="group hover:bg-slate-50/50 cursor-pointer">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                <AvatarFallback><Building2 size={20} /></AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold text-slate-900">{store.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">Owner: {store.owner}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-600">{store.license}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-slate-500 font-medium text-sm">
                                            <MapPin size={14} /> {store.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`rounded-lg px-2.5 py-0.5 font-bold ${
                                                store.status === 'APPROVED' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                store.status === 'PENDING' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                                                store.status === 'REJECTED' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                                                'bg-gray-100 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {store.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-200">
                                                    <MoreVertical size={16} className="text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl min-w-[150px]">
                                                <DropdownMenuItem className="font-bold text-slate-600">View Full Profile</DropdownMenuItem>
                                                <DropdownMenuItem className="font-bold text-slate-600">Audit Logs</DropdownMenuItem>
                                                {store.status === 'APPROVED' && (
                                                    <DropdownMenuItem 
                                                        className="font-bold text-red-600 focus:text-red-700 focus:bg-red-50"
                                                        onClick={() => handleStatusUpdate(store.id, 'REJECTED')}
                                                    >
                                                        Suspend Store
                                                    </DropdownMenuItem>
                                                )}
                                                {store.status === 'REJECTED' && (
                                                    <DropdownMenuItem 
                                                        className="font-bold text-green-600 focus:text-green-700 focus:bg-green-50"
                                                        onClick={() => handleStatusUpdate(store.id, 'APPROVED')}
                                                    >
                                                        Approve Store
                                                    </DropdownMenuItem>
                                                )}
                                                {store.status === 'PENDING' && (
                                                    <>
                                                        <DropdownMenuItem 
                                                            className="font-bold text-green-600 focus:text-green-700 focus:bg-green-50"
                                                            onClick={() => handleStatusUpdate(store.id, 'APPROVED')}
                                                        >
                                                            Approve Store
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            className="font-bold text-red-600 focus:text-red-700 focus:bg-red-50"
                                                            onClick={() => handleStatusUpdate(store.id, 'REJECTED')}
                                                        >
                                                            Reject Store
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
