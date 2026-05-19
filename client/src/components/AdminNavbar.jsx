{user?.role === 'admin' ? (
  <>
    <DropdownMenuItem
      onClick={() => navigate('/admin/dashboard')}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <LayoutDashboard className="w-4 h-4 mr-2" />
      Dashboard
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate('/admin/course')}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      Courses
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate('/admin/course/create')}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      Create Course
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate('/admin/leads')}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      Leads
    </DropdownMenuItem>

    <DropdownMenuItem
      onClick={() => navigate('/admin/payments')}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      Payments
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem
      onClick={logoutHandler}
      className="cursor-pointer text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <LogOutIcon className="w-4 h-4 mr-2" />
      Sign Out
    </DropdownMenuItem>
  </>
) : (