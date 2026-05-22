// ==================== STATE ====================
let students = JSON.parse(localStorage.getItem('students')) || [];
let courses = JSON.parse(localStorage.getItem('courses')) || [];
let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
let attendances = JSON.parse(localStorage.getItem('attendances')) || [];
let admins = JSON.parse(localStorage.getItem('admins')) || [];
let paymentRecords = JSON.parse(localStorage.getItem('paymentRecords')) || [];
let currentAdmin = JSON.parse(sessionStorage.getItem('currentAdmin')) || null;
let editingStudentId = null;
let editingCourseId = null;
let editingEnrollmentId = null;
let editingAdminId = null;
let importedStudents = [];
let importEnrollStudents = [];
let paymentSelectedCourseId = null;
let paymentSelectedStudentId = null;
let paymentSelectedMonth = null;
let paymentSelectedStatus = '';

// Tab keys for permissions
const TAB_KEYS = ['students', 'courses', 'enrollment', 'attendance', 'payment', 'report'];
const TAB_LABELS = { students: 'Học Viên', courses: 'Khóa Học', enrollment: 'Ghi Danh', attendance: 'Điểm Danh', payment: 'Thanh Toán', report: 'Báo Cáo' };

// ==================== DOM ELEMENTS ====================
// Students
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const studentEmptyMessage = document.getElementById('studentEmptyMessage');
const studentDetailModal = document.getElementById('studentDetailModal');
const studentFormTitle = document.getElementById('studentFormTitle');
const studentSubmitBtn = document.getElementById('studentSubmitBtn');
const studentCancelBtn = document.getElementById('studentCancelBtn');
const studentSearch = document.getElementById('studentSearch');
const studentFilterStatus = document.getElementById('studentFilterStatus');
const studentFilterCourse = document.getElementById('studentFilterCourse');
const clearStudentFilters = document.getElementById('clearStudentFilters');
const deleteFilteredStudents = document.getElementById('deleteFilteredStudents');

// Courses
const courseForm = document.getElementById('courseForm');
const courseTableBody = document.getElementById('courseTableBody');
const courseEmptyMessage = document.getElementById('courseEmptyMessage');
const courseFormTitle = document.getElementById('courseFormTitle');
const courseSubmitBtn = document.getElementById('courseSubmitBtn');
const courseCancelBtn = document.getElementById('courseCancelBtn');
const courseFilterMonth = document.getElementById('courseFilterMonth');
const courseFilterStatus = document.getElementById('courseFilterStatus');
const courseFilterInstructor = document.getElementById('courseFilterInstructor');
const clearCourseFilters = document.getElementById('clearCourseFilters');

// Quick Add Course
const quickAddSourceCourse = document.getElementById('quickAddSourceCourse');
const quickAddMonth = document.getElementById('quickAddMonth');
const quickAddCourseBtn = document.getElementById('quickAddCourseBtn');

// Quick Course Management
const quickManageMonth = document.getElementById('quickManageMonth');
const quickManageSection = document.getElementById('quickManageSection');
const quickManageTableBody = document.getElementById('quickManageTableBody');
const quickManageEmpty = document.getElementById('quickManageEmpty');

// Excel Import
const excelFileInput = document.getElementById('excelFileInput');
const uploadExcelBtn = document.getElementById('uploadExcelBtn');
const fileName = document.getElementById('fileName');
const importPreview = document.getElementById('importPreview');
const previewTableBody = document.getElementById('previewTableBody');
const previewCount = document.getElementById('previewCount');
const importAllBtn = document.getElementById('importAllBtn');
const cancelImportBtn = document.getElementById('cancelImportBtn');
const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');

// Enrollment
const enrollmentForm = document.getElementById('enrollmentForm');
const enrollmentTableBody = document.getElementById('enrollmentTableBody');
const enrollmentEmptyMessage = document.getElementById('enrollmentEmptyMessage');
const enrollmentDeleteAllBtn = document.getElementById('enrollmentDeleteAllBtn');
const enrollmentDeleteAllWrap = document.getElementById('enrollmentDeleteAllWrap');
const enrollStudent = document.getElementById('enrollStudent');
const enrollStudentSearch = document.getElementById('enrollStudentSearch');
const enrollStudentDropdown = document.getElementById('enrollStudentDropdown');
const enrollCourse = document.getElementById('enrollCourse');
const enrollDate = document.getElementById('enrollDate');
const enrollFilterCourse = document.getElementById('enrollFilterCourse');
const enrollSearch = document.getElementById('enrollSearch');
const clearEnrollFilters = document.getElementById('clearEnrollFilters');
const discountType = document.getElementById('discountType');
const discountValue = document.getElementById('discountValue');
const enrollmentFormTitle = document.getElementById('enrollmentFormTitle');
const enrollmentSubmitBtn = document.getElementById('enrollmentSubmitBtn');
const enrollmentCancelBtn = document.getElementById('enrollmentCancelBtn');

// Import & Enroll
const importEnrollCourse = document.getElementById('importEnrollCourse');
const importEnrollDate = document.getElementById('importEnrollDate');
const importEnrollFileInput = document.getElementById('importEnrollFileInput');
const uploadImportEnrollBtn = document.getElementById('uploadImportEnrollBtn');
const importEnrollFileName = document.getElementById('importEnrollFileName');
const importEnrollPreview = document.getElementById('importEnrollPreview');
const importEnrollPreviewBody = document.getElementById('importEnrollPreviewBody');
const importEnrollPreviewCount = document.getElementById('importEnrollPreviewCount');
const importEnrollAllBtn = document.getElementById('importEnrollAllBtn');
const cancelImportEnrollBtn = document.getElementById('cancelImportEnrollBtn');
const downloadImportEnrollTemplateBtn = document.getElementById('downloadImportEnrollTemplateBtn');

// Copy Enrollment
const copyFromCourse = document.getElementById('copyFromCourse');
const copyToCourse = document.getElementById('copyToCourse');
const copyInfo = document.getElementById('copyInfo');
const copyStudentCount = document.getElementById('copyStudentCount');
const copyEnrollmentBtn = document.getElementById('copyEnrollmentBtn');

// Attendance
const attendCourse = document.getElementById('attendCourse');
const attendMonth = document.getElementById('attendMonth');
const attendDate = document.getElementById('attendDate');
const addDateBtn = document.getElementById('addDateBtn');
const attendanceMatrixSection = document.getElementById('attendanceMatrixSection');
const attendanceMatrixTitle = document.getElementById('attendanceMatrixTitle');
const attendanceMatrixHead = document.getElementById('attendanceMatrixHead');
const attendanceMatrixBody = document.getElementById('attendanceMatrixBody');
const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
const attendanceEmptyMessage = document.getElementById('attendanceEmptyMessage');

// Payment
const paymentCourseSelect = document.getElementById('paymentCourseSelect');
const paymentStatusFilter = document.getElementById('paymentStatusFilter');
const paymentSelectBtn = document.getElementById('paymentSelectBtn');
const paymentStudentTitle = document.getElementById('paymentStudentTitle');
const paymentStudentTableBody = document.getElementById('paymentStudentTableBody');
const paymentStudentEmpty = document.getElementById('paymentStudentEmpty');
const paymentDetailTitle = document.getElementById('paymentDetailTitle');
const paymentDetailContent = document.getElementById('paymentDetailContent');
const paymentStudentInfo = document.getElementById('paymentStudentInfo');
const paymentAttendanceBody = document.getElementById('paymentAttendanceBody');
const paymentSummary = document.getElementById('paymentSummary');
const paymentDetailEmpty = document.getElementById('paymentDetailEmpty');
const paymentMonthFilter = document.getElementById('paymentMonthFilter');
const paymentStatusSelect = document.getElementById('paymentStatusSelect');
const paymentMethodSelect = document.getElementById('paymentMethodSelect');
const paymentConfirmBtn = document.getElementById('paymentConfirmBtn');

// Admin
const loginOverlay = document.getElementById('loginOverlay');
const appLayout = document.getElementById('appLayout');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserName = document.getElementById('currentUserName');
const navAdmin = document.getElementById('navAdmin');
const adminForm = document.getElementById('adminForm');
const adminTableBody = document.getElementById('adminTableBody');
const adminEmptyMessage = document.getElementById('adminEmptyMessage');
const adminFormTitle = document.getElementById('adminFormTitle');
const adminSubmitBtn = document.getElementById('adminSubmitBtn');
const adminCancelBtn = document.getElementById('adminCancelBtn');
const permissionMatrix = document.getElementById('permissionMatrix');
const changePasswordModal = document.getElementById('changePasswordModal');
const changePasswordForm = document.getElementById('changePasswordForm');
const changePasswordInfo = document.getElementById('changePasswordInfo');
const changePasswordError = document.getElementById('changePasswordError');

// Report
const reportPeriod = document.getElementById('reportPeriod');
const reportYear = document.getElementById('reportYear');
const reportQuarter = document.getElementById('reportQuarter');
const reportQuarterWrap = document.getElementById('reportQuarterWrap');
const reportMonth = document.getElementById('reportMonth');
const reportMonthWrap = document.getElementById('reportMonthWrap');
const reportRangeWrap = document.getElementById('reportRangeWrap');
const reportFromDate = document.getElementById('reportFromDate');
const reportToDate = document.getElementById('reportToDate');
const rangeDateMode = document.getElementById('rangeDateMode');
const rangeMonthDisplay = document.getElementById('rangeMonthDisplay');
const rangeDropdownMode = document.getElementById('rangeDropdownMode');
const reportFromMonthLabel = document.getElementById('reportFromMonthLabel');
const reportToMonthLabel = document.getElementById('reportToMonthLabel');
const reportFromMonth = document.getElementById('reportFromMonth');
const reportToMonth = document.getElementById('reportToMonth');
const reportCourseInput = document.getElementById('reportCourseInput');
const reportCourseText = document.getElementById('reportCourseText');
const reportCourseDropdown = document.getElementById('reportCourseDropdown');
const reportCourseOptions = document.getElementById('reportCourseOptions');
const reportSummary = document.getElementById('reportSummary');
const reportTotalRevenue = document.getElementById('reportTotalRevenue');
const reportTotalStudents = document.getElementById('reportTotalStudents');
const reportTotalSessions = document.getElementById('reportTotalSessions');
const reportTotalDiscount = document.getElementById('reportTotalDiscount');
const reportCourseSection = document.getElementById('reportCourseSection');
const reportCourseBody = document.getElementById('reportCourseBody');
const reportStudentSection = document.getElementById('reportStudentSection');
const reportStudentTitle = document.getElementById('reportStudentTitle');
const reportStudentCourseHeader = document.getElementById('reportStudentCourseHeader');
const reportStudentBody = document.getElementById('reportStudentBody');
const reportEmpty = document.getElementById('reportEmpty');

// ==================== INITIALIZATION ====================
document.getElementById('enrollDate').valueAsDate = new Date();

// Tab switching
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Student event listeners
studentForm.addEventListener('submit', handleStudentSubmit);
studentCancelBtn.addEventListener('click', cancelStudentEdit);
studentSearch.addEventListener('input', renderStudentTable);
studentFilterStatus.addEventListener('change', renderStudentTable);
studentFilterCourse.addEventListener('change', renderStudentTable);
clearStudentFilters.addEventListener('click', clearStudentFilterInputs);
deleteFilteredStudents.addEventListener('click', handleDeleteFilteredStudents);

// Course event listeners
courseForm.addEventListener('submit', handleCourseSubmit);
courseCancelBtn.addEventListener('click', cancelCourseEdit);
courseFilterMonth.addEventListener('change', renderCourseTable);
courseFilterStatus.addEventListener('change', renderCourseTable);
courseFilterInstructor.addEventListener('change', renderCourseTable);
clearCourseFilters.addEventListener('click', clearCourseFilterInputs);
quickAddCourseBtn.addEventListener('click', handleQuickAddCourse);
quickManageMonth.addEventListener('change', renderQuickManageTable);

// Excel Import event listeners
uploadExcelBtn.addEventListener('click', () => excelFileInput.click());
excelFileInput.addEventListener('change', handleExcelUpload);
importAllBtn.addEventListener('click', importAllStudents);
cancelImportBtn.addEventListener('click', cancelImport);
downloadTemplateBtn.addEventListener('click', downloadTemplate);

// Import & Enroll event listeners
uploadImportEnrollBtn.addEventListener('click', () => importEnrollFileInput.click());
importEnrollFileInput.addEventListener('change', handleImportEnrollUpload);
importEnrollAllBtn.addEventListener('click', importAndEnrollAll);
cancelImportEnrollBtn.addEventListener('click', cancelImportEnroll);
downloadImportEnrollTemplateBtn.addEventListener('click', downloadImportEnrollTemplate);

// Enrollment event listeners
enrollmentForm.addEventListener('submit', handleEnrollment);
enrollmentDeleteAllBtn.addEventListener('click', handleDeleteAllEnrollments);

// Student autocomplete
enrollStudentSearch.addEventListener('input', handleStudentSearch);
enrollStudentSearch.addEventListener('focus', handleStudentSearch);
document.addEventListener('click', (e) => {
    if (!enrollStudentSearch.contains(e.target) && !enrollStudentDropdown.contains(e.target)) {
        enrollStudentDropdown.style.display = 'none';
    }
});
enrollFilterCourse.addEventListener('change', renderEnrollmentTable);
enrollSearch.addEventListener('input', renderEnrollmentTable);
clearEnrollFilters.addEventListener('click', clearEnrollmentFilterInputs);
enrollmentCancelBtn.addEventListener('click', cancelEnrollmentEdit);
enrollStudent.addEventListener('change', () => {
    if (!editingEnrollmentId) {
        const student = students.find(s => s.id === enrollStudent.value);
        if (student && student.discountType) {
            discountType.value = student.discountType;
            discountValue.value = student.discountValue || '';
            discountValue.disabled = false;
        } else {
            discountType.value = '';
            discountValue.value = '';
            discountValue.disabled = true;
        }
    }
});
discountType.addEventListener('change', () => {
    discountValue.disabled = !discountType.value;
    if (!discountType.value) discountValue.value = '';
    discountValue.placeholder = discountType.value === 'percent' ? '0%' : '0₫';
});

// Copy Enrollment event listeners
copyFromCourse.addEventListener('change', updateCopyInfo);
copyToCourse.addEventListener('change', updateCopyInfo);
copyEnrollmentBtn.addEventListener('click', handleCopyEnrollment);

// Payment event listeners
paymentCourseSelect.addEventListener('change', () => {
    const course = courses.find(c => c.id === paymentCourseSelect.value);
    if (course && course.month) {
        paymentMonthFilter.value = course.month;
    }
});
paymentSelectBtn.addEventListener('click', handlePaymentSelect);
paymentMonthFilter.addEventListener('change', () => {
    if (paymentCourseSelect.value) {
        handlePaymentSelect();
    }
});
paymentConfirmBtn.addEventListener('click', handlePaymentConfirm);

// Attendance event listeners
document.getElementById('attendDate').valueAsDate = new Date();
attendCourse.addEventListener('change', () => {
    // Auto-select month from course
    const course = courses.find(c => c.id === attendCourse.value);
    if (course && course.month) {
        attendMonth.value = course.month;
    }
    renderAttendanceMatrix();
});
attendMonth.addEventListener('change', renderAttendanceMatrix);
addDateBtn.addEventListener('click', handleAddDate);
saveAttendanceBtn.addEventListener('click', handleSaveAttendance);

// Admin event listeners
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
adminForm.addEventListener('submit', handleAdminSubmit);
adminCancelBtn.addEventListener('click', cancelAdminEdit);
changePasswordForm.addEventListener('submit', handlePasswordChange);

// Report event listeners
reportPeriod.addEventListener('change', handleReportPeriodChange);
reportYear.addEventListener('change', handleYearChange);
reportQuarter.addEventListener('change', handleQuarterChange);
reportMonth.addEventListener('change', handleMonthChange);
reportFromDate.addEventListener('change', renderReport);
reportToDate.addEventListener('change', renderReport);
reportFromMonth.addEventListener('change', renderReport);
reportToMonth.addEventListener('change', renderReport);

// Initialize admin system
initAdminSystem();

// ==================== ADMIN SYSTEM ====================
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function saveAdmins() {
    localStorage.setItem('admins', JSON.stringify(admins));
}

function initAdminSystem() {
    // Create default super admin if no admins exist
    if (admins.length === 0) {
        hashPassword('admin123').then(hash => {
            admins.push({
                id: Date.now().toString(),
                username: 'admin',
                passwordHash: hash,
                name: 'Super Admin',
                role: 'super',
                permissions: {
                    students: { view: true, add: true, edit: true, delete: true },
                    courses: { view: true, add: true, edit: true, delete: true },
                    enrollment: { view: true, add: true, edit: true, delete: true },
                    attendance: { view: true, add: true, edit: true, delete: true },
                    payment: { view: true, add: true, edit: true, delete: true }
                },
                createdAt: new Date().toISOString()
            });
            saveAdmins();
        });
    }

    // Check session
    if (currentAdmin) {
        showApp();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginOverlay.style.display = 'flex';
    appLayout.style.display = 'none';
    loginError.textContent = '';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function showApp() {
    loginOverlay.style.display = 'none';
    appLayout.style.display = 'flex';
    currentUserName.textContent = currentAdmin.name + (currentAdmin.role === 'super' ? ' (Super)' : '');
    navAdmin.style.display = currentAdmin.role === 'super' ? 'flex' : 'none';
    importEnrollDate.value = new Date().toISOString().split('T')[0];
    applyPermissions();
    renderAll();
    renderAdminTable();

    // Close modal when clicking outside
    studentDetailModal.addEventListener('click', function(e) {
        if (e.target === this) closeStudentDetailModal();
    });
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const hash = await hashPassword(password);
    const admin = admins.find(a => a.username === username && a.passwordHash === hash);

    if (!admin) {
        loginError.textContent = 'Sai tên đăng nhập hoặc mật khẩu.';
        return;
    }

    currentAdmin = admin;
    sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
    showApp();
}

function handleLogout() {
    currentAdmin = null;
    sessionStorage.removeItem('currentAdmin');
    // Switch to students tab
    switchTab('students');
    showLogin();
}

function checkPermission(tab, action) {
    if (!currentAdmin) return false;
    if (currentAdmin.role === 'super') return true;
    const perms = currentAdmin.permissions[tab];
    return perms ? !!perms[action] : false;
}

function applyPermissions() {
    // Hide/show tabs based on view permission
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
        const tab = btn.dataset.tab;
        if (tab === 'admin') return; // handled separately
        btn.style.display = checkPermission(tab, 'view') ? 'flex' : 'none';
    });

    // If current tab is hidden, switch to first visible tab
    const activeBtn = document.querySelector('.nav-btn.active');
    if (activeBtn && activeBtn.style.display === 'none') {
        const firstVisible = document.querySelector('.nav-btn[data-tab]:not([style*="display: none"])');
        if (firstVisible) switchTab(firstVisible.dataset.tab);
    }

    // Students tab permissions
    const studentFormSection = studentForm.closest('.form-section');
    const importSection = document.querySelector('#tab-students .form-section:nth-child(3)');
    if (studentFormSection) studentFormSection.style.display = checkPermission('students', 'add') ? 'block' : 'none';
    if (importSection) importSection.style.display = checkPermission('students', 'add') ? 'block' : 'none';

    // Courses tab permissions
    const courseFormSection = courseForm.closest('.form-section');
    if (courseFormSection) courseFormSection.style.display = checkPermission('courses', 'add') ? 'block' : 'none';

    // Enrollment tab permissions
    const enrollFormSection = enrollmentForm.closest('.form-section');
    const copySection = document.querySelector('#tab-enrollment .form-section:nth-child(2)');
    if (enrollFormSection) enrollFormSection.style.display = checkPermission('enrollment', 'add') ? 'block' : 'none';
    if (copySection) copySection.style.display = checkPermission('enrollment', 'add') ? 'block' : 'none';

    // Attendance tab permissions
    const attendFormSection = document.querySelector('#tab-attendance .form-section');
    if (attendFormSection) {
        addDateBtn.style.display = checkPermission('attendance', 'add') ? 'inline-block' : 'none';
        saveAttendanceBtn.style.display = checkPermission('attendance', 'edit') ? 'inline-block' : 'none';
    }
}

// ==================== ADMIN CRUD ====================
async function handleAdminSubmit(e) {
    e.preventDefault();
    if (currentAdmin.role !== 'super') return;

    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    const name = document.getElementById('adminName').value.trim();
    const role = document.getElementById('adminRole').value;

    // Check duplicate username
    const existing = admins.find(a => a.username === username && a.id !== editingAdminId);
    if (existing) {
        alert('Tên đăng nhập đã tồn tại.');
        return;
    }

    // Read permissions from matrix
    const permissions = readPermissionMatrix();

    if (editingAdminId) {
        // Update
        const admin = admins.find(a => a.id === editingAdminId);
        if (admin) {
            admin.username = username;
            admin.name = name;
            admin.role = role;
            admin.permissions = permissions;
            if (password) {
                admin.passwordHash = await hashPassword(password);
            }
            // Update currentAdmin if editing self
            if (admin.id === currentAdmin.id) {
                currentAdmin = admin;
                sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
                currentUserName.textContent = admin.name + (admin.role === 'super' ? ' (Super)' : '');
                navAdmin.style.display = admin.role === 'super' ? 'flex' : 'none';
                applyPermissions();
            }
        }
    } else {
        // Add new
        if (!password) {
            alert('Vui lòng nhập mật khẩu.');
            return;
        }
        const hash = await hashPassword(password);
        admins.push({
            id: Date.now().toString(),
            username,
            passwordHash: hash,
            name,
            role,
            permissions,
            createdAt: new Date().toISOString()
        });
    }

    saveAdmins();
    cancelAdminEdit();
    renderAdminTable();
}

function readPermissionMatrix() {
    const permissions = {};
    TAB_KEYS.forEach(tab => {
        permissions[tab] = { view: false, add: false, edit: false, delete: false };
    });
    permissionMatrix.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const tab = cb.dataset.tab;
        const action = cb.dataset.action;
        if (permissions[tab]) {
            permissions[tab][action] = cb.checked;
        }
    });
    return permissions;
}

function setPermissionMatrix(permissions) {
    permissionMatrix.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const tab = cb.dataset.tab;
        const action = cb.dataset.action;
        cb.checked = permissions[tab] ? !!permissions[tab][action] : false;
    });
}

function resetPermissionMatrix() {
    permissionMatrix.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.dataset.action === 'view';
    });
}

function renderAdminTable() {
    adminTableBody.innerHTML = '';
    if (admins.length === 0) {
        adminEmptyMessage.style.display = 'block';
        return;
    }
    adminEmptyMessage.style.display = 'none';

    admins.forEach(admin => {
        const tr = document.createElement('tr');
        const permTags = [];
        TAB_KEYS.forEach(tab => {
            const p = admin.permissions[tab];
            if (!p) return;
            if (p.view) permTags.push(`<span class="permission-tag perm-view">${TAB_LABELS[tab]}: Xem</span>`);
            if (p.add) permTags.push(`<span class="permission-tag perm-add">${TAB_LABELS[tab]}: Thêm</span>`);
            if (p.edit) permTags.push(`<span class="permission-tag perm-edit">${TAB_LABELS[tab]}: Sửa</span>`);
            if (p.delete) permTags.push(`<span class="permission-tag perm-delete">${TAB_LABELS[tab]}: Xóa</span>`);
        });

        const isSelf = admin.id === currentAdmin.id;
        const roleLabel = admin.role === 'super' ? 'Super Admin' : 'Quản Trị Viên';

        tr.innerHTML = `
            <td>${admin.username}</td>
            <td>${admin.name}</td>
            <td><span class="status-badge ${admin.role === 'super' ? 'status-active' : 'status-open'}">${roleLabel}</span></td>
            <td><div class="permission-tags">${permTags.join('')}</div></td>
            <td class="actions-cell">
                <button class="btn btn-sm btn-secondary" onclick="startAdminEdit('${admin.id}')">Sửa</button>
                <button class="btn btn-sm btn-accent" onclick="openChangePassword('${admin.id}')">Đổi MK</button>
                ${!isSelf ? `<button class="btn btn-sm btn-danger" onclick="deleteAdmin('${admin.id}')">Xóa</button>` : ''}
            </td>
        `;
        adminTableBody.appendChild(tr);
    });
}

function startAdminEdit(id) {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;

    editingAdminId = id;
    adminFormTitle.textContent = 'Sửa Quản Trị Viên';
    adminSubmitBtn.textContent = 'Cập Nhật';
    adminCancelBtn.style.display = 'inline-block';
    adminPassword.required = false;
    adminPassword.placeholder = 'Để trống nếu không đổi';

    document.getElementById('adminUsername').value = admin.username;
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminName').value = admin.name;
    document.getElementById('adminRole').value = admin.role;
    setPermissionMatrix(admin.permissions);

    adminForm.scrollIntoView({ behavior: 'smooth' });
}

function cancelAdminEdit() {
    editingAdminId = null;
    adminFormTitle.textContent = 'Thêm Người Quản Trị';
    adminSubmitBtn.textContent = 'Thêm Quản Trị Viên';
    adminCancelBtn.style.display = 'none';
    adminPassword.required = true;
    adminPassword.placeholder = 'Mật khẩu';
    adminForm.reset();
    resetPermissionMatrix();
}

function deleteAdmin(id) {
    if (id === currentAdmin.id) {
        alert('Không thể xóa tài khoản đang đăng nhập.');
        return;
    }
    if (!confirm('Bạn có chắc muốn xóa quản trị viên này?')) return;
    admins = admins.filter(a => a.id !== id);
    saveAdmins();
    renderAdminTable();
}

let changePasswordAdminId = null;

function openChangePassword(id) {
    if (currentAdmin.role !== 'super') return;
    const admin = admins.find(a => a.id === id);
    if (!admin) return;

    changePasswordAdminId = id;
    changePasswordInfo.textContent = `Đổi mật khẩu cho: ${admin.name} (${admin.username})`;
    changePasswordError.textContent = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    changePasswordModal.style.display = 'flex';
}

function closeChangePassword() {
    changePasswordModal.style.display = 'none';
    changePasswordAdminId = null;
}

async function handlePasswordChange(e) {
    e.preventDefault();
    if (!changePasswordAdminId) return;

    const newPwd = document.getElementById('newPassword').value;
    const confirmPwd = document.getElementById('confirmPassword').value;

    if (newPwd.length < 4) {
        changePasswordError.textContent = 'Mật khẩu phải có ít nhất 4 ký tự.';
        return;
    }
    if (newPwd !== confirmPwd) {
        changePasswordError.textContent = 'Mật khẩu xác nhận không khớp.';
        return;
    }

    const admin = admins.find(a => a.id === changePasswordAdminId);
    if (!admin) return;

    admin.passwordHash = await hashPassword(newPwd);
    saveAdmins();

    // Update currentAdmin if changing own password
    if (admin.id === currentAdmin.id) {
        currentAdmin = admin;
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
    }

    closeChangePassword();
    alert('Đổi mật khẩu thành công!');
}

// ==================== REPORT ====================
function renderReportDropdowns() {
    // Year dropdown - get unique years from courses
    const currentYear = reportYear.value;
    const years = new Set();
    courses.forEach(c => { if (c.month) years.add(new Date().getFullYear()); });
    attendances.forEach(a => { years.add(new Date(a.date).getFullYear()); });
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    reportYear.innerHTML = '<option value="">-- Chọn năm --</option>';
    sortedYears.forEach(y => {
        reportYear.innerHTML += `<option value="${y}">${y}</option>`;
    });
    if (currentYear) reportYear.value = currentYear;

    // Course multi-select (default: none selected)
    const selectedCourses = getSelectedReportCourses();
    reportCourseOptions.innerHTML = '';
    courses.forEach(c => {
        const checked = selectedCourses.includes(c.id) ? 'checked' : '';
        reportCourseOptions.innerHTML += `
            <label class="multi-select-option">
                <input type="checkbox" value="${c.id}" ${checked}> ${formatCourseName(c)}
            </label>`;
    });
    updateReportCourseText();
    attachCourseCheckboxListeners();
}

function getSelectedReportCourses() {
    const checkboxes = reportCourseOptions.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value).filter(v => v !== '');
}

function updateReportCourseText() {
    const selected = getSelectedReportCourses();
    if (selected.length === 0) {
        reportCourseText.textContent = '-- Chọn khóa học --';
    } else if (selected.length === 1) {
        const course = courses.find(c => c.id === selected[0]);
        reportCourseText.textContent = course ? formatCourseName(course) : '1 khóa học';
    } else {
        reportCourseText.textContent = `${selected.length} khóa học đã chọn`;
    }
}

function attachCourseCheckboxListeners() {
    const allCheckbox = reportCourseDropdown.querySelector('input[value=""]');
    const courseCheckboxes = reportCourseOptions.querySelectorAll('input[type="checkbox"]');

    // "All" checkbox behavior
    if (allCheckbox) {
        allCheckbox.addEventListener('change', () => {
            if (allCheckbox.checked) {
                courseCheckboxes.forEach(cb => cb.checked = false);
            }
            updateReportCourseText();
            renderReport();
        });
    }

    // Individual checkbox behavior
    courseCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.checked && allCheckbox) {
                allCheckbox.checked = false;
            }
            // If none selected, check "all"
            const anyChecked = Array.from(courseCheckboxes).some(c => c.checked);
            if (!anyChecked && allCheckbox) {
                allCheckbox.checked = true;
            }
            updateReportCourseText();
            renderReport();
        });
    });
}

// Toggle dropdown
reportCourseInput.addEventListener('click', (e) => {
    e.stopPropagation();
    reportCourseDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!reportCourseInput.contains(e.target) && !reportCourseDropdown.contains(e.target)) {
        reportCourseDropdown.classList.remove('show');
    }
});

function handleReportPeriodChange() {
    const period = reportPeriod.value;

    // Clear values and show/hide correct mode
    if (period === 'month') {
        reportQuarter.value = '';
        reportFromMonth.value = '';
        reportToMonth.value = '';
        rangeDateMode.style.display = 'flex';
        rangeMonthDisplay.style.display = 'none';
        rangeDropdownMode.style.display = 'none';
    } else if (period === 'quarter') {
        reportMonth.value = '';
        reportFromMonth.value = '';
        reportToMonth.value = '';
        rangeDateMode.style.display = 'none';
        rangeMonthDisplay.style.display = 'flex';
        rangeDropdownMode.style.display = 'none';
    } else if (period === 'range') {
        reportQuarter.value = '';
        reportMonth.value = '';
        reportFromDate.value = '';
        reportToDate.value = '';
        rangeDateMode.style.display = 'none';
        rangeMonthDisplay.style.display = 'none';
        rangeDropdownMode.style.display = 'flex';
    } else if (period === 'year') {
        reportQuarter.value = '';
        reportMonth.value = '';
        reportFromMonth.value = '';
        reportToMonth.value = '';
        rangeDateMode.style.display = 'flex';
        rangeMonthDisplay.style.display = 'none';
        rangeDropdownMode.style.display = 'none';
    }

    renderReport();
}

function handleYearChange() {
    const period = reportPeriod.value;
    const year = parseInt(reportYear.value);

    if (period === 'year' && year) {
        reportFromDate.value = `${year}-01-01`;
        reportToDate.value = `${year}-12-31`;
    } else if (period === 'month') {
        handleMonthChange();
        return;
    } else if (period === 'quarter') {
        handleQuarterChange();
        return;
    }

    renderReport();
}

function handleMonthChange() {
    const year = parseInt(reportYear.value);
    const month = parseInt(reportMonth.value);
    if (year && month) {
        const lastDay = new Date(year, month, 0).getDate();
        reportFromDate.value = `${year}-${String(month).padStart(2, '0')}-01`;
        reportToDate.value = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    }
    renderReport();
}

function handleQuarterChange() {
    const quarter = parseInt(reportQuarter.value);
    if (quarter) {
        const fromMonth = (quarter - 1) * 3 + 1;
        const toMonth = quarter * 3;
        reportFromMonthLabel.textContent = `Tháng ${fromMonth}`;
        reportToMonthLabel.textContent = `Tháng ${toMonth}`;
    }
    renderReport();
}

function getReportMonths() {
    const period = reportPeriod.value;
    const year = parseInt(reportYear.value);

    if (!year) return [];

    if (period === 'year') {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    if (period === 'quarter') {
        const quarter = parseInt(reportQuarter.value);
        if (!quarter) return [];
        return [(quarter - 1) * 3 + 1, (quarter - 1) * 3 + 2, (quarter - 1) * 3 + 3];
    }

    if (period === 'month') {
        const month = parseInt(reportMonth.value);
        if (!month) return [];
        return [month];
    }

    if (period === 'range') {
        const from = parseInt(reportFromMonth.value);
        const to = parseInt(reportToMonth.value);
        if (!from || !to || from > to) return [];
        const months = [];
        for (let m = from; m <= to; m++) months.push(m);
        return months;
    }

    return [];
}

function calculateCourseRevenue(courseId, months, year) {
    // Get enrolled students for this course
    const courseEnrollments = enrollments.filter(e => e.courseId === courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) return { students: 0, sessions: 0, revenue: 0, discount: 0, net: 0, details: [] };

    // Get dates in selected months/year
    const dates = getCourseAttendanceDates(courseId).filter(d => {
        const date = new Date(d);
        return months.includes(date.getMonth() + 1) && date.getFullYear() === year;
    });
    const sessions = dates.length;

    let totalRevenue = 0;
    let totalDiscount = 0;
    let studentCount = 0;
    const details = [];

    courseEnrollments.forEach(enrollment => {
        const student = students.find(s => s.id === enrollment.studentId);
        if (!student) return;

        // Count present sessions for this student in selected months/year
        const presentCount = attendances.filter(
            a => a.studentId === student.id && a.courseId === courseId && a.present &&
                 months.includes(new Date(a.date).getMonth() + 1) && new Date(a.date).getFullYear() === year
        ).length;

        if (presentCount === 0 && sessions === 0) return;

        const gross = presentCount * course.fee;
        let discount = 0;
        if (enrollment.discountType === 'percent') {
            discount = gross * (enrollment.discountValue || 0) / 100;
        } else if (enrollment.discountType === 'amount') {
            discount = enrollment.discountValue || 0;
        }
        const net = Math.max(0, gross - discount);

        totalRevenue += gross;
        totalDiscount += discount;
        if (presentCount > 0) studentCount++;

        details.push({
            studentId: student.id,
            studentName: student.name,
            presentCount,
            gross,
            discount,
            net
        });
    });

    return {
        students: studentCount,
        sessions,
        revenue: totalRevenue,
        discount: totalDiscount,
        net: totalRevenue - totalDiscount,
        details
    };
}

function renderReport() {
    const year = parseInt(reportYear.value);
    const months = getReportMonths();
    const selectedCourseIds = getSelectedReportCourses();

    if (!year || months.length === 0) {
        reportSummary.style.display = 'none';
        reportCourseSection.style.display = 'none';
        reportStudentSection.style.display = 'none';
        reportEmpty.style.display = 'block';
        return;
    }

    reportEmpty.style.display = 'none';
    reportSummary.style.display = 'grid';

    // Determine which courses to include
    const coursesToReport = selectedCourseIds.length > 0
        ? courses.filter(c => selectedCourseIds.includes(c.id))
        : courses.filter(c => {
            const dates = getCourseAttendanceDates(c.id).filter(d => {
                const date = new Date(d);
                return months.includes(date.getMonth() + 1) && date.getFullYear() === year;
            });
            return dates.length > 0;
        });

    // Calculate totals
    let grandRevenue = 0;
    let grandDiscount = 0;
    let grandStudents = new Set();
    let grandSessions = 0;
    const courseResults = [];

    coursesToReport.forEach(course => {
        const result = calculateCourseRevenue(course.id, months, year);
        grandRevenue += result.revenue;
        grandDiscount += result.discount;
        grandSessions += result.sessions;
        result.details.forEach(d => {
            if (d.presentCount > 0) grandStudents.add(d.studentId);
        });
        courseResults.push({ course, ...result });
    });

    // Update summary cards
    reportTotalRevenue.textContent = formatCurrency(grandRevenue - grandDiscount);
    reportTotalStudents.textContent = grandStudents.size;
    reportTotalSessions.textContent = grandSessions;
    reportTotalDiscount.textContent = formatCurrency(grandDiscount);

    // Render course table
    if (courseResults.length > 0) {
        reportCourseSection.style.display = 'block';
        reportCourseBody.innerHTML = '';
        courseResults.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${formatCourseName(r.course)}</strong></td>
                <td>${r.students}</td>
                <td>${r.sessions}</td>
                <td>${formatCurrency(r.course.fee)}</td>
                <td>${formatCurrency(r.revenue)}</td>
                <td>${formatCurrency(r.discount)}</td>
                <td><strong>${formatCurrency(r.net)}</strong></td>
            `;
            reportCourseBody.appendChild(tr);
        });
    } else {
        reportCourseSection.style.display = 'none';
    }

    // Render student detail table (when courses are selected)
    const hasDetails = courseResults.some(r => r.details.length > 0);
    if (courseResults.length > 0 && hasDetails) {
        reportStudentSection.style.display = 'block';
        const courseNames = courseResults.map(r => formatCourseName(r.course)).join(', ');
        reportStudentTitle.textContent = `Chi Tiết Học Viên - ${courseNames}`;
        reportStudentBody.innerHTML = '';
        reportStudentCourseHeader.style.display = courseResults.length > 1 ? '' : 'none';

        // Combine all details across courses
        const allDetails = [];
        courseResults.forEach(r => {
            r.details.forEach(d => {
                allDetails.push({ ...d, courseName: formatCourseName(r.course), courseId: r.course.id });
            });
        });

        const showCourseCol = courseResults.length > 1;
        allDetails
            .sort((a, b) => b.net - a.net)
            .forEach((d, i) => {
                // Get payment status for this student/course across all months
                const relevantRecords = paymentRecords.filter(r =>
                    r.studentId === d.studentId && r.courseId === d.courseId && months.includes(parseInt(r.month))
                );
                let paymentStatus = 'Chưa thanh toán';
                if (relevantRecords.length > 0) {
                    // If any record is paid, show paid; if any is debt, show debt
                    if (relevantRecords.some(r => r.status === 'Đã thanh toán')) {
                        paymentStatus = 'Đã thanh toán';
                    } else if (relevantRecords.some(r => r.status === 'Công nợ tháng tiếp theo')) {
                        paymentStatus = 'Công nợ tháng tiếp theo';
                    }
                }
                const statusClass = paymentStatus === 'Đã thanh toán' ? 'status-paid' : 'status-unpaid';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${d.studentName}</td>
                    ${showCourseCol ? `<td>${d.courseName}</td>` : ''}
                    <td>${d.presentCount}</td>
                    <td>${formatCurrency(d.gross)}</td>
                    <td>${formatCurrency(d.discount)}</td>
                    <td><strong>${formatCurrency(d.net)}</strong></td>
                    <td><span class="status-badge ${statusClass}">${paymentStatus}</span></td>
                `;
                reportStudentBody.appendChild(tr);
            });
    } else {
        reportStudentSection.style.display = 'none';
    }
}

// ==================== TAB SWITCHING ====================
function switchTab(tab) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === 'tab-' + tab);
    });
}

// ==================== RENDER ALL ====================
function renderAll() {
    renderSummary();
    renderStudentTable();
    renderCourseTable();
    renderEnrollmentDropdowns();
    renderEnrollmentTable();
    renderCopyEnrollmentDropdowns();
    renderAttendanceDropdowns();
    renderAttendanceMatrix();
    renderPaymentDropdowns();
    renderReportDropdowns();
    handleReportPeriodChange();
    if (paymentSelectedCourseId && paymentSelectedMonth) {
        renderPaymentStudents(paymentSelectedCourseId, paymentSelectedStatus, paymentSelectedMonth);
        if (paymentSelectedStudentId) {
            renderPaymentDetails(paymentSelectedCourseId, paymentSelectedStudentId);
        }
    }
}

// ==================== UTILITY ====================
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' ₫';
}

function formatCourseName(course) {
    if (!course) return '';
    return course.month ? `${course.name} - Tháng ${course.month}` : course.name;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getStatusClass(status) {
    const map = {
        'Đang học': 'status-active',
        'Tạm nghỉ': 'status-inactive',
        'Đã tốt nghiệp': 'status-graduated',
        'Đang mở': 'status-open',
        'Đã đầy': 'status-full',
        'Đã kết thúc': 'status-ended',
        'Chưa bắt đầu': 'status-inactive'
    };
    return map[status] || '';
}

function getStudentCourseCount(studentId) {
    return enrollments.filter(e => e.studentId === studentId).length;
}

function getStudentCourses(studentId) {
    return enrollments
        .filter(e => e.studentId === studentId)
        .map(e => {
            const course = courses.find(c => c.id === e.courseId);
            return course ? formatCourseName(course) : 'Unknown';
        });
}

// ==================== SUMMARY ====================
function renderSummary() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('activeStudents').textContent = students.filter(s => s.status === 'Đang học').length;
    document.getElementById('totalCourses').textContent = courses.length;
}

// ==================== STUDENT FUNCTIONS ====================
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function handleStudentSubmit(e) {
    e.preventDefault();

    const isEdit = !!editingStudentId;
    if (isEdit && !checkPermission('students', 'edit')) return;
    if (!isEdit && !checkPermission('students', 'add')) return;

    const name = document.getElementById('studentName').value.trim();
    const phone = document.getElementById('studentPhone').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const dob = document.getElementById('studentDOB').value;
    const gender = document.getElementById('studentGender').value;
    const address = document.getElementById('studentAddress').value.trim();
    const status = document.getElementById('studentStatus').value;

    if (editingStudentId) {
        const index = students.findIndex(s => s.id === editingStudentId);
        if (index !== -1) {
            students[index] = { ...students[index], name, phone, email, dob, gender, address, status };
        }
        cancelStudentEdit();
    } else {
        // Check duplicate by phone
        if (phone && students.some(s => s.phone === phone)) {
            alert('Số điện thoại này đã tồn tại trong hệ thống.');
            return;
        }
        students.push({
            id: Date.now().toString(),
            name, phone, email, dob, gender, address, status,
            createdAt: new Date().toISOString()
        });
    }

    saveStudents();
    studentForm.reset();
    renderAll();
}

function deleteStudent(id) {
    if (!checkPermission('students', 'delete')) return;
    const courseCount = getStudentCourseCount(id);
    if (courseCount > 0) {
        if (!confirm(`Học viên này đang ghi danh ${courseCount} khóa học. Xóa học viên sẽ xóa tất cả ghi danh và điểm danh. Tiếp tục?`)) return;
        enrollments = enrollments.filter(e => e.studentId !== id);
        saveEnrollments();
    } else {
        if (!confirm('Xóa học viên này?')) return;
    }
    // Clean up attendance records
    attendances = attendances.filter(a => a.studentId !== id);
    saveAttendances();
    students = students.filter(s => s.id !== id);
    saveStudents();
    renderAll();
}

function handleDeleteFilteredStudents() {
    if (!currentAdmin || currentAdmin.role !== 'super') {
        alert('Chỉ Super Admin mới có quyền xóa hàng loạt.');
        return;
    }

    const filtered = getFilteredStudents();
    if (filtered.length === 0) {
        alert('Không có học viên nào trong bộ lọc để xóa.');
        return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa ${filtered.length} học viên theo bộ lọc hiện tại?\nThao tác này sẽ xóa cả ghi danh và điểm danh liên quan.`)) return;

    const idsToDelete = new Set(filtered.map(s => s.id));

    // Remove related enrollments
    enrollments = enrollments.filter(e => !idsToDelete.has(e.studentId));
    saveEnrollments();

    // Remove related attendance
    attendances = attendances.filter(a => !idsToDelete.has(a.studentId));
    saveAttendances();

    // Remove students
    students = students.filter(s => !idsToDelete.has(s.id));
    saveStudents();

    renderAll();
    alert(`Đã xóa thành công ${filtered.length} học viên.`);
}

function startStudentEdit(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentPhone').value = student.phone;
    document.getElementById('studentEmail').value = student.email || '';
    document.getElementById('studentDOB').value = student.dob || '';
    document.getElementById('studentGender').value = student.gender || '';
    document.getElementById('studentAddress').value = student.address || '';
    document.getElementById('studentStatus').value = student.status;

    editingStudentId = id;
    studentFormTitle.textContent = 'Sửa Thông Tin Học Viên';
    studentSubmitBtn.textContent = 'Cập Nhật';
    studentCancelBtn.style.display = 'inline-block';
    studentForm.scrollIntoView({ behavior: 'smooth' });
}

function cancelStudentEdit() {
    editingStudentId = null;
    studentFormTitle.textContent = 'Thêm Học Viên';
    studentSubmitBtn.textContent = 'Thêm Học Viên';
    studentCancelBtn.style.display = 'none';
    studentForm.reset();
}

function showStudentDetail(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const studentEnrollments = enrollments.filter(e => e.studentId === id);
    const currentMonth = new Date().getMonth() + 1;

    let coursesHTML = '';
    if (studentEnrollments.length === 0) {
        coursesHTML = '<p style="color: var(--text-light); font-style: italic;">Học viên chưa ghi danh khóa học nào.</p>';
    } else {
        coursesHTML = '<div class="course-list">';
        studentEnrollments.forEach(e => {
            const course = courses.find(c => c.id === e.courseId);
            if (!course) return;

            // Check payment status for current month
            const paymentRecord = paymentRecords.find(r =>
                r.studentId === id &&
                r.courseId === e.courseId &&
                r.month === String(currentMonth)
            );
            const paymentStatus = paymentRecord ? paymentRecord.status : 'Chưa thanh toán';
            const statusClass = paymentStatus === 'Đã thanh toán' ? 'status-paid' : 'status-unpaid';

            coursesHTML += `
                <div class="course-item">
                    <div>
                        <div class="course-name">${formatCourseName(course)}</div>
                        <div class="course-month">Giảng viên: ${course.instructor} | Học phí/buổi: ${formatCurrency(course.fee)}</div>
                    </div>
                    <span class="${statusClass}">${paymentStatus}</span>
                </div>
            `;
        });
        coursesHTML += '</div>';
    }

    document.getElementById('studentDetailBody').innerHTML = `
        <div class="student-info">
            <p><strong>Họ Tên:</strong> ${student.name}</p>
            <p><strong>SĐT:</strong> ${student.phone || '-'}</p>
            <p><strong>Email:</strong> ${student.email || '-'}</p>
            <p><strong>Ngày Sinh:</strong> ${student.dob || '-'}</p>
            <p><strong>Giới Tính:</strong> ${student.gender || '-'}</p>
            <p><strong>Địa Chỉ:</strong> ${student.address || '-'}</p>
            <p><strong>Trạng Thái:</strong> <span class="status-badge ${getStatusClass(student.status)}">${student.status}</span></p>
        </div>
        <h3 style="margin: 1rem 0 0.75rem; color: var(--primary-dark); font-size: 1rem;">Khóa Học Đang Ghi Danh (${studentEnrollments.length})</h3>
        ${coursesHTML}
    `;

    document.getElementById('studentDetailModal').style.display = 'flex';
}

function closeStudentDetailModal() {
    document.getElementById('studentDetailModal').style.display = 'none';
}

function clearStudentFilterInputs() {
    studentSearch.value = '';
    studentFilterStatus.value = '';
    studentFilterCourse.value = '';
    deleteFilteredStudents.style.display = 'none';
    renderStudentTable();
}

function getFilteredStudents() {
    let filtered = [...students];
    const search = studentSearch.value.toLowerCase();
    const status = studentFilterStatus.value;
    const courseFilter = studentFilterCourse.value;

    if (search) {
        filtered = filtered.filter(s =>
            s.name.toLowerCase().includes(search) ||
            s.phone.includes(search)
        );
    }
    if (status) filtered = filtered.filter(s => s.status === status);
    if (courseFilter === 'has_course') {
        filtered = filtered.filter(s => enrollments.some(e => e.studentId === s.id));
    } else if (courseFilter === 'no_course') {
        filtered = filtered.filter(s => !enrollments.some(e => e.studentId === s.id));
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function renderStudentTable() {
    const filtered = getFilteredStudents();
    studentTableBody.innerHTML = '';

    // Show/hide delete filtered button (super admin only, when filter is active)
    const hasActiveFilter = studentSearch.value || studentFilterStatus.value || studentFilterCourse.value;
    deleteFilteredStudents.style.display = (hasActiveFilter && currentAdmin && currentAdmin.role === 'super') ? 'inline-block' : 'none';

    if (filtered.length === 0) {
        studentEmptyMessage.style.display = 'block';
        return;
    }

    studentEmptyMessage.style.display = 'none';

    filtered.forEach(student => {
        const tr = document.createElement('tr');
        const canEdit = checkPermission('students', 'edit');
        const canDelete = checkPermission('students', 'delete');
        const actions = [`<button class="btn btn-secondary btn-sm" onclick="showStudentDetail('${student.id}')">Chi Tiết</button>`];
        if (canEdit) actions.push(`<button class="btn btn-edit" onclick="startStudentEdit('${student.id}')">Sửa</button>`);
        if (canDelete) actions.push(`<button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Xóa</button>`);

        tr.innerHTML = `
            <td><strong>${student.name}</strong></td>
            <td>${student.phone}</td>
            <td>${student.email || '-'}</td>
            <td>${student.gender || '-'}</td>
            <td><span class="status-badge ${getStatusClass(student.status)}">${student.status}</span></td>
            <td class="actions-cell">${actions.join('')}</td>
        `;
        studentTableBody.appendChild(tr);
    });
}

// ==================== COURSE FUNCTIONS ====================
function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function handleCourseSubmit(e) {
    e.preventDefault();

    const isEdit = !!editingCourseId;
    if (isEdit && !checkPermission('courses', 'edit')) return;
    if (!isEdit && !checkPermission('courses', 'add')) return;

    const name = document.getElementById('courseName').value.trim();
    const instructor = document.getElementById('courseInstructor').value.trim();
    const month = document.getElementById('courseMonth').value;
    const fee = parseFloat(document.getElementById('courseFee').value);
    const maxStudentsVal = document.getElementById('courseMaxStudents').value;
    const maxStudents = maxStudentsVal ? parseInt(maxStudentsVal) : 30;
    const status = document.getElementById('courseStatus').value;

    if (editingCourseId) {
        const index = courses.findIndex(c => c.id === editingCourseId);
        if (index !== -1) {
            courses[index] = { ...courses[index], name, instructor, month, fee, maxStudents, status };
        }
        cancelCourseEdit();
    } else {
        courses.push({
            id: Date.now().toString(),
            name, instructor, month, fee, maxStudents, status,
            createdAt: new Date().toISOString()
        });
    }

    saveCourses();
    courseForm.reset();
    renderAll();
}

function deleteCourse(id) {
    if (!checkPermission('courses', 'delete')) return;
    const enrollCount = enrollments.filter(e => e.courseId === id).length;
    if (enrollCount > 0) {
        if (!confirm(`Khóa học này có ${enrollCount} học viên. Xóa khóa học sẽ xóa tất cả ghi danh và điểm danh. Tiếp tục?`)) return;
        enrollments = enrollments.filter(e => e.courseId !== id);
        saveEnrollments();
    } else {
        if (!confirm('Xóa khóa học này?')) return;
    }
    // Clean up attendance records
    attendances = attendances.filter(a => a.courseId !== id);
    saveAttendances();
    courses = courses.filter(c => c.id !== id);
    saveCourses();
    renderAll();
}

function startCourseEdit(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    document.getElementById('courseName').value = course.name;
    document.getElementById('courseInstructor').value = course.instructor;
    document.getElementById('courseMonth').value = course.month || '';
    document.getElementById('courseFee').value = course.fee;
    document.getElementById('courseMaxStudents').value = course.maxStudents;
    document.getElementById('courseStatus').value = course.status;

    editingCourseId = id;
    courseFormTitle.textContent = 'Sửa Khóa Học';
    courseSubmitBtn.textContent = 'Cập Nhật';
    courseCancelBtn.style.display = 'inline-block';
    courseForm.scrollIntoView({ behavior: 'smooth' });
}

function cancelCourseEdit() {
    editingCourseId = null;
    courseFormTitle.textContent = 'Thêm Khóa Học';
    courseSubmitBtn.textContent = 'Thêm Khóa Học';
    courseCancelBtn.style.display = 'none';
    courseForm.reset();
}

function getCourseEnrollmentCount(courseId) {
    return enrollments.filter(e => e.courseId === courseId).length;
}

function renderCourseTable() {
    courseTableBody.innerHTML = '';

    // Populate instructor filter dropdown
    const currentInstructor = courseFilterInstructor.value;
    const instructors = [...new Set(courses.map(c => c.instructor).filter(Boolean))].sort();
    courseFilterInstructor.innerHTML = '<option value="">Tất Cả Giảng Viên</option>';
    instructors.forEach(inst => {
        courseFilterInstructor.innerHTML += `<option value="${inst}">${inst}</option>`;
    });
    courseFilterInstructor.value = currentInstructor;

    // Apply filters
    const filterMonth = courseFilterMonth.value;
    const filterStatus = courseFilterStatus.value;
    const filterInstructor = courseFilterInstructor.value;

    let filtered = courses;
    if (filterMonth) {
        filtered = filtered.filter(c => c.month === parseInt(filterMonth));
    }
    if (filterStatus) {
        filtered = filtered.filter(c => c.status === filterStatus);
    }
    if (filterInstructor) {
        filtered = filtered.filter(c => c.instructor === filterInstructor);
    }

    if (filtered.length === 0) {
        courseEmptyMessage.style.display = 'block';
        return;
    }

    courseEmptyMessage.style.display = 'none';

    filtered.forEach(course => {
        const enrolled = getCourseEnrollmentCount(course.id);
        const tr = document.createElement('tr');
        const canEdit = checkPermission('courses', 'edit');
        const canDelete = checkPermission('courses', 'delete');
        const actions = [];
        if (canEdit) actions.push(`<button class="btn btn-edit" onclick="startCourseEdit('${course.id}')">Sửa</button>`);
        if (canDelete) actions.push(`<button class="btn btn-danger" onclick="deleteCourse('${course.id}')">Xóa</button>`);

        tr.innerHTML = `
            <td><strong>${course.name}</strong></td>
            <td>${course.instructor}</td>
            <td>Tháng ${course.month || '-'}</td>
            <td>${formatCurrency(course.fee)}</td>
            <td>${enrolled}/${course.maxStudents || '-'}</td>
            <td><span class="status-badge ${getStatusClass(course.status)}">${course.status}</span></td>
            <td class="actions-cell">${actions.join('') || '-'}</td>
        `;
        courseTableBody.appendChild(tr);
    });

    // Populate quick add source course dropdown
    const currentQuickAdd = quickAddSourceCourse.value;
    quickAddSourceCourse.innerHTML = '<option value="">Chọn khóa học</option>';
    courses.forEach(c => {
        quickAddSourceCourse.innerHTML += `<option value="${c.id}">${formatCourseName(c)}</option>`;
    });
    quickAddSourceCourse.value = currentQuickAdd;
}

function clearCourseFilterInputs() {
    courseFilterMonth.value = '';
    courseFilterStatus.value = 'Đang mở';
    courseFilterInstructor.value = '';
    renderCourseTable();
}

function handleQuickAddCourse() {
    if (!checkPermission('courses', 'add')) return;

    const sourceId = quickAddSourceCourse.value;
    if (!sourceId) {
        alert('Vui lòng chọn khóa học gốc.');
        return;
    }

    const newMonth = quickAddMonth.value;
    if (!newMonth) {
        alert('Vui lòng chọn tháng mới.');
        return;
    }

    const source = courses.find(c => c.id === sourceId);
    if (!source) {
        alert('Khóa học gốc không tồn tại.');
        return;
    }

    // Check if duplicate course (same name + month)
    const duplicate = courses.find(c => c.name === source.name && c.month === parseInt(newMonth));
    if (duplicate) {
        alert(`Đã tồn tại khóa học "${source.name} - Tháng ${newMonth}".`);
        return;
    }

    const newCourse = {
        id: Date.now().toString(),
        name: source.name,
        instructor: source.instructor,
        month: parseInt(newMonth),
        fee: source.fee,
        maxStudents: source.maxStudents || 30,
        status: 'Đang mở',
        createdAt: new Date().toISOString()
    };

    courses.push(newCourse);
    saveCourses();
    quickAddMonth.value = '';
    renderAll();
    alert(`Đã tạo khóa học "${formatCourseName(newCourse)}" thành công!`);
}

function renderQuickManageTable() {
    const month = parseInt(quickManageMonth.value);
    if (!month) {
        quickManageSection.style.display = 'none';
        return;
    }

    quickManageSection.style.display = 'block';
    const monthCourses = courses.filter(c => c.month === month);

    if (monthCourses.length === 0) {
        quickManageTableBody.innerHTML = '';
        quickManageEmpty.style.display = 'block';
        return;
    }

    quickManageEmpty.style.display = 'none';
    quickManageTableBody.innerHTML = '';

    monthCourses.forEach(course => {
        const enrolled = getCourseEnrollmentCount(course.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${course.name}</strong></td>
            <td>${course.instructor}</td>
            <td>${formatCurrency(course.fee)}</td>
            <td>${enrolled}/${course.maxStudents || '-'}</td>
            <td>
                <select class="preview-edit-input quick-manage-status" data-course-id="${course.id}">
                    <option value="Chưa bắt đầu" ${course.status === 'Chưa bắt đầu' ? 'selected' : ''}>Chưa bắt đầu</option>
                    <option value="Đang mở" ${course.status === 'Đang mở' ? 'selected' : ''}>Đang mở</option>
                    <option value="Đã đầy" ${course.status === 'Đã đầy' ? 'selected' : ''}>Đã đầy</option>
                    <option value="Đã kết thúc" ${course.status === 'Đã kết thúc' ? 'selected' : ''}>Đã kết thúc</option>
                </select>
            </td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="updateQuickManageStatus('${course.id}')">Lưu</button>
            </td>
        `;
        quickManageTableBody.appendChild(tr);
    });
}

function updateQuickManageStatus(courseId) {
    if (!checkPermission('courses', 'edit')) return;

    const select = quickManageTableBody.querySelector(`.quick-manage-status[data-course-id="${courseId}"]`);
    if (!select) return;

    const newStatus = select.value;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    course.status = newStatus;
    saveCourses();
    renderAll();
    alert(`Đã cập nhật trạng thái "${formatCourseName(course)}" thành "${newStatus}".`);
}

// ==================== ENROLLMENT FUNCTIONS ====================
function saveEnrollments() {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
}

function renderEnrollmentDropdowns() {
    // Student autocomplete - keep current value if still valid
    const currentStudentId = enrollStudent.value;
    const currentStudent = students.find(s => s.id === currentStudentId);
    if (currentStudent) {
        enrollStudentSearch.value = currentStudent.name;
    } else {
        enrollStudent.value = '';
        enrollStudentSearch.value = '';
    }

    // Course dropdown
    const currentCourse = enrollCourse.value;
    enrollCourse.innerHTML = '<option value="">Chọn khóa học</option>';
    courses.filter(c => c.status === 'Đang mở').forEach(c => {
        const enrolled = getCourseEnrollmentCount(c.id);
        if (!c.maxStudents || enrolled < c.maxStudents) {
            enrollCourse.innerHTML += `<option value="${c.id}">${formatCourseName(c)} (${enrolled}/${c.maxStudents || '-'})</option>`;
        }
    });
    enrollCourse.value = currentCourse;

    // Import & Enroll course dropdown
    const currentImportEnrollCourse = importEnrollCourse.value;
    importEnrollCourse.innerHTML = '<option value="">Chọn khóa học</option>';
    courses.filter(c => c.status === 'Đang mở').forEach(c => {
        const enrolled = getCourseEnrollmentCount(c.id);
        importEnrollCourse.innerHTML += `<option value="${c.id}">${formatCourseName(c)} (${enrolled}/${c.maxStudents || '-'})</option>`;
    });
    importEnrollCourse.value = currentImportEnrollCourse;

    // Filter course dropdown
    const currentFilterCourse = enrollFilterCourse.value;
    enrollFilterCourse.innerHTML = '<option value="">Tất Cả Khóa Học</option>';
    courses.forEach(c => {
        enrollFilterCourse.innerHTML += `<option value="${c.id}">${formatCourseName(c)}</option>`;
    });
    enrollFilterCourse.value = currentFilterCourse;
}

function handleStudentSearch() {
    const query = enrollStudentSearch.value.trim().toLowerCase();
    enrollStudent.value = '';

    if (!query) {
        enrollStudentDropdown.style.display = 'none';
        return;
    }

    const matches = students.filter(s =>
        s.status === 'Đang học' && s.name.toLowerCase().includes(query)
    ).slice(0, 10);

    if (matches.length === 0) {
        enrollStudentDropdown.innerHTML = '<div class="autocomplete-item" style="color: var(--text-light);">Không tìm thấy</div>';
        enrollStudentDropdown.style.display = 'block';
        return;
    }

    enrollStudentDropdown.innerHTML = matches.map(s => {
        const phone = s.phone ? ` - ${s.phone}` : '';
        return `<div class="autocomplete-item" data-id="${s.id}" data-name="${s.name}">
            <strong>${highlightMatch(s.name, query)}</strong>
            <span class="student-info">${phone}</span>
        </div>`;
    }).join('');

    enrollStudentDropdown.style.display = 'block';

    enrollStudentDropdown.querySelectorAll('.autocomplete-item[data-id]').forEach(item => {
        item.addEventListener('click', () => {
            enrollStudent.value = item.dataset.id;
            enrollStudentSearch.value = item.dataset.name;
            enrollStudentDropdown.style.display = 'none';
        });
    });
}

function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text;
    return text.substring(0, index) +
        '<mark style="background:#fff59d;padding:0;">' + text.substring(index, index + query.length) + '</mark>' +
        text.substring(index + query.length);
}

function handleEnrollment(e) {
    e.preventDefault();

    const isEdit = !!editingEnrollmentId;
    if (isEdit && !checkPermission('enrollment', 'edit')) return;
    if (!isEdit && !checkPermission('enrollment', 'add')) return;

    const studentId = enrollStudent.value;
    const courseId = enrollCourse.value;
    const date = enrollDate.value;
    const discType = discountType.value;
    const discValue = parseFloat(discountValue.value) || 0;

    if (!studentId || !courseId) {
        alert('Vui lòng chọn học viên và khóa học.');
        return;
    }

    // Validate discount
    if (discType === 'percent' && discValue > 100) {
        alert('Phần trăm ưu đãi không được vượt quá 100%.');
        return;
    }

    // Edit mode
    if (editingEnrollmentId) {
        const index = enrollments.findIndex(e => e.id === editingEnrollmentId);
        if (index !== -1) {
            enrollments[index] = {
                ...enrollments[index],
                date,
                discountType: discType,
                discountValue: discValue
            };
        }
        saveEnrollments();
        cancelEnrollmentEdit();
        renderAll();
        alert('Cập nhật ghi danh thành công!');
        return;
    }

    // Add mode - Check duplicate
    if (enrollments.some(e => e.studentId === studentId && e.courseId === courseId)) {
        alert('Học viên này đã ghi danh vào khóa học này.');
        return;
    }

    // Check course capacity
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const enrolled = getCourseEnrollmentCount(courseId);
        if (course.maxStudents && enrolled >= course.maxStudents) {
            alert('Khóa học đã đầy.');
            return;
        }
    }

    enrollments.push({
        id: Date.now().toString(),
        studentId,
        courseId,
        date,
        discountType: discType,
        discountValue: discValue,
        createdAt: new Date().toISOString()
    });

    saveEnrollments();
    enrollmentForm.reset();
    discountValue.disabled = true;
    document.getElementById('enrollDate').valueAsDate = new Date();
    renderAll();
    alert('Ghi danh thành công!');
}

function removeEnrollment(id) {
    if (!checkPermission('enrollment', 'delete')) return;
    if (!confirm('Xóa ghi danh này?')) return;
    enrollments = enrollments.filter(e => e.id !== id);
    saveEnrollments();
    renderAll();
}

function handleDeleteAllEnrollments() {
    if (!currentAdmin || currentAdmin.role !== 'super') return;
    if (!confirm('Bạn có chắc muốn xóa TOÀN BỘ ghi danh? Hành động này không thể hoàn tác.')) return;
    if (!confirm('Xác nhận lần 2: Xóa tất cả ' + enrollments.length + ' ghi danh?')) return;
    enrollments = [];
    saveEnrollments();
    renderAll();
}

function startEnrollmentEdit(id) {
    const enrollment = enrollments.find(e => e.id === id);
    if (!enrollment) return;

    editingEnrollmentId = id;
    enrollStudent.value = enrollment.studentId;
    enrollCourse.value = enrollment.courseId;
    enrollDate.value = enrollment.date;
    discountType.value = enrollment.discountType || '';
    discountValue.value = enrollment.discountValue || '';
    discountValue.disabled = !discountType.value;

    // Set search input to student name
    const student = students.find(s => s.id === enrollment.studentId);
    enrollStudentSearch.value = student ? student.name : '';

    enrollStudentSearch.disabled = true;
    enrollCourse.disabled = true;

    enrollmentFormTitle.textContent = 'Cập Nhật Ghi Danh';
    enrollmentSubmitBtn.textContent = 'Cập Nhật';
    enrollmentCancelBtn.style.display = 'inline-block';

    window.scrollTo({ top: enrollmentForm.offsetTop - 20, behavior: 'smooth' });
}

function cancelEnrollmentEdit() {
    editingEnrollmentId = null;
    enrollmentForm.reset();
    discountValue.disabled = true;
    enrollStudentSearch.disabled = false;
    enrollStudentSearch.value = '';
    enrollStudent.value = '';
    enrollCourse.disabled = false;
    enrollmentFormTitle.textContent = 'Ghi Danh Học Viên';
    enrollmentSubmitBtn.textContent = 'Ghi Danh';
    enrollmentCancelBtn.style.display = 'none';
    document.getElementById('enrollDate').valueAsDate = new Date();
}

function clearEnrollmentFilterInputs() {
    enrollFilterCourse.value = '';
    enrollSearch.value = '';
    renderEnrollmentTable();
}

function getFilteredEnrollments() {
    let filtered = [...enrollments];
    const courseId = enrollFilterCourse.value;
    const search = enrollSearch.value.toLowerCase();

    if (courseId) filtered = filtered.filter(e => e.courseId === courseId);
    if (search) {
        filtered = filtered.filter(e => {
            const student = students.find(s => s.id === e.studentId);
            return student && student.name.toLowerCase().includes(search);
        });
    }

    return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function renderEnrollmentTable() {
    const filtered = getFilteredEnrollments();
    enrollmentTableBody.innerHTML = '';

    // Show/hide delete all button (super admin only, when enrollments exist)
    const showDeleteAll = currentAdmin && currentAdmin.role === 'super' && enrollments.length > 0;
    enrollmentDeleteAllWrap.style.display = showDeleteAll ? 'block' : 'none';

    if (filtered.length === 0) {
        enrollmentEmptyMessage.style.display = 'block';
        return;
    }

    enrollmentEmptyMessage.style.display = 'none';

    filtered.forEach(enrollment => {
        const student = students.find(s => s.id === enrollment.studentId);
        const course = courses.find(c => c.id === enrollment.courseId);

        let discountText = '-';
        if (enrollment.discountType === 'percent') {
            discountText = enrollment.discountValue + '%';
        } else if (enrollment.discountType === 'amount') {
            discountText = formatCurrency(enrollment.discountValue);
        }

        const canEdit = checkPermission('enrollment', 'edit');
        const canDelete = checkPermission('enrollment', 'delete');
        const actions = [];
        if (canEdit) actions.push(`<button class="btn btn-primary" onclick="startEnrollmentEdit('${enrollment.id}')">Sửa</button>`);
        if (canDelete) actions.push(`<button class="btn btn-danger" onclick="removeEnrollment('${enrollment.id}')">Xóa</button>`);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${student ? student.name : 'Đã xóa'}</strong></td>
            <td>${course ? formatCourseName(course) : 'Đã xóa'}</td>
            <td>${formatDate(enrollment.date)}</td>
            <td>${discountText}</td>
            <td class="actions-cell">${actions.join('') || '-'}</td>
        `;
        enrollmentTableBody.appendChild(tr);
    });
}

// ==================== COPY ENROLLMENT FUNCTIONS ====================
function renderCopyEnrollmentDropdowns() {
    const currentFrom = copyFromCourse.value;
    const currentTo = copyToCourse.value;

    copyFromCourse.innerHTML = '<option value="">Chọn khóa học nguồn</option>';
    copyToCourse.innerHTML = '<option value="">Chọn khóa học đích</option>';

    courses.forEach(c => {
        const enrollCount = enrollments.filter(e => e.courseId === c.id).length;
        const optionText = `${formatCourseName(c)} (${enrollCount} học viên)`;
        copyFromCourse.innerHTML += `<option value="${c.id}">${optionText}</option>`;
        copyToCourse.innerHTML += `<option value="${c.id}">${optionText}</option>`;
    });

    copyFromCourse.value = currentFrom;
    copyToCourse.value = currentTo;
}

function updateCopyInfo() {
    const fromId = copyFromCourse.value;
    const toId = copyToCourse.value;

    if (fromId && toId) {
        if (fromId === toId) {
            copyInfo.style.display = 'block';
            copyStudentCount.textContent = 'Không thể sao chép cùng một khóa học.';
            copyStudentCount.style.color = '#f44336';
            return;
        }

        const fromCourse = courses.find(c => c.id === fromId);
        const toCourse = courses.find(c => c.id === toId);
        const studentCount = enrollments.filter(e => e.courseId === fromId).length;

        // Check how many students already enrolled in target
        const existingInTarget = enrollments.filter(e => e.courseId === toId).map(e => e.studentId);
        const fromStudentIds = enrollments.filter(e => e.courseId === fromId).map(e => e.studentId);
        const newStudents = fromStudentIds.filter(id => !existingInTarget.includes(id));

        copyInfo.style.display = 'block';
        copyStudentCount.style.color = 'var(--primary-dark)';

        if (studentCount === 0) {
            copyStudentCount.textContent = `Khóa học "${fromCourse.name}" chưa có học viên nào.`;
        } else if (newStudents.length === 0) {
            copyStudentCount.textContent = `Tất cả ${studentCount} học viên đã có trong khóa học "${toCourse.name}".`;
        } else {
            copyStudentCount.textContent = `Sẽ sao chép ${newStudents.length} học viên mới (tổng ${studentCount}, bỏ qua ${studentCount - newStudents.length} đã có).`;
        }
    } else {
        copyInfo.style.display = 'none';
    }
}

function handleCopyEnrollment() {
    if (!checkPermission('enrollment', 'add')) return;
    const fromId = copyFromCourse.value;
    const toId = copyToCourse.value;

    if (!fromId || !toId) {
        alert('Vui lòng chọn cả khóa học nguồn và khóa học đích.');
        return;
    }

    if (fromId === toId) {
        alert('Không thể sao chép cùng một khóa học.');
        return;
    }

    const fromCourse = courses.find(c => c.id === fromId);
    const toCourse = courses.find(c => c.id === toId);

    // Get students from source course
    const fromStudentIds = enrollments.filter(e => e.courseId === fromId).map(e => e.studentId);

    if (fromStudentIds.length === 0) {
        alert(`Khóa học "${fromCourse.name}" chưa có học viên nào.`);
        return;
    }

    // Get students already in target course
    const existingInTarget = enrollments.filter(e => e.courseId === toId).map(e => e.studentId);

    // Filter out students already in target
    const newStudentIds = fromStudentIds.filter(id => !existingInTarget.includes(id));

    if (newStudentIds.length === 0) {
        alert(`Tất cả học viên đã có trong khóa học "${toCourse.name}".`);
        return;
    }

    // Confirm
    if (!confirm(`Sao chép ${newStudentIds.length} học viên từ "${fromCourse.name}" sang "${toCourse.name}"?`)) {
        return;
    }

    // Add new enrollments
    const today = new Date().toISOString().split('T')[0];
    newStudentIds.forEach(studentId => {
        const sourceEnrollment = enrollments.find(e => e.studentId === studentId && e.courseId === fromId);
        enrollments.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            studentId: studentId,
            courseId: toId,
            date: today,
            discountType: sourceEnrollment ? sourceEnrollment.discountType : '',
            discountValue: sourceEnrollment ? sourceEnrollment.discountValue : 0,
            createdAt: new Date().toISOString()
        });
    });

    saveEnrollments();
    renderAll();
    alert(`Đã sao chép thành công ${newStudentIds.length} học viên sang khóa học "${toCourse.name}".`);
}

// ==================== PAYMENT FUNCTIONS ====================
function renderPaymentDropdowns() {
    const currentCourse = paymentCourseSelect.value;
    paymentCourseSelect.innerHTML = '<option value="">-- Chọn khóa học --</option>';
    courses.forEach(c => {
        paymentCourseSelect.innerHTML += `<option value="${c.id}">${formatCourseName(c)}</option>`;
    });
    paymentCourseSelect.value = currentCourse;
}

function handlePaymentSelect() {
    const courseId = paymentCourseSelect.value;
    const status = paymentStatusFilter.value;
    const month = paymentMonthFilter.value;

    if (!courseId) {
        alert('Vui lòng chọn khóa học.');
        return;
    }

    if (!month) {
        alert('Vui lòng chọn tháng.');
        return;
    }

    paymentSelectedCourseId = courseId;
    paymentSelectedStatus = status;
    paymentSelectedMonth = month;
    paymentSelectedStudentId = null;

    renderPaymentStudents(courseId, status, month);

    // Reset details section
    paymentDetailContent.style.display = 'none';
    paymentDetailEmpty.style.display = 'block';
    paymentDetailEmpty.textContent = 'Chọn học viên để xem chi tiết.';
}

function renderPaymentStudents(courseId, status, month) {
    const course = courses.find(c => c.id === courseId);
    paymentStudentTitle.textContent = `Danh Sách Học Viên - ${course ? formatCourseName(course) : ''}`;

    // Get enrolled students
    const enrolledStudentIds = enrollments
        .filter(e => e.courseId === courseId)
        .map(e => e.studentId);

    let enrolledStudents = students.filter(s => enrolledStudentIds.includes(s.id));

    // Filter by status if selected
    if (status) {
        enrolledStudents = enrolledStudents.filter(s => s.status === status);
    }

    // Filter by month - only show students with attendance in selected month
    if (month) {
        enrolledStudents = enrolledStudents.filter(s => {
            return attendances.some(a =>
                a.studentId === s.id &&
                a.courseId === courseId &&
                a.present &&
                new Date(a.date).getMonth() + 1 === parseInt(month)
            );
        });
    }

    paymentStudentTableBody.innerHTML = '';

    if (enrolledStudents.length === 0) {
        paymentStudentEmpty.style.display = 'block';
        paymentStudentEmpty.textContent = `Không có học viên nào đi học trong tháng ${month}.`;
        return;
    }

    paymentStudentEmpty.style.display = 'none';

    enrolledStudents.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.className = paymentSelectedStudentId === student.id ? 'selected' : '';
        const statusClass = student.status === 'Đang học' ? 'active' : student.status === 'Tạm nghỉ' ? 'inactive' : 'graduated';
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${student.name}</strong></td>
            <td>${student.phone}</td>
            <td><span class="status-badge status-${statusClass}">${student.status}</span></td>
            <td><button class="btn-select" onclick="selectPaymentStudent('${student.id}')">Chọn</button></td>
        `;
        paymentStudentTableBody.appendChild(tr);
    });
}

function selectPaymentStudent(studentId) {
    paymentSelectedStudentId = studentId;
    renderPaymentStudents(paymentSelectedCourseId, paymentSelectedStatus, paymentSelectedMonth);
    renderPaymentDetails(paymentSelectedCourseId, studentId);
}

function savePaymentRecords() {
    localStorage.setItem('paymentRecords', JSON.stringify(paymentRecords));
}

function handlePaymentConfirm() {
    if (!paymentSelectedCourseId || !paymentSelectedStudentId || !paymentSelectedMonth) {
        alert('Vui lòng chọn khóa học, tháng và học viên trước.');
        return;
    }

    const status = paymentStatusSelect.value;
    const method = paymentMethodSelect.value;

    // Find existing record
    const existingIndex = paymentRecords.findIndex(r =>
        r.studentId === paymentSelectedStudentId &&
        r.courseId === paymentSelectedCourseId &&
        r.month === paymentSelectedMonth
    );

    const record = {
        studentId: paymentSelectedStudentId,
        courseId: paymentSelectedCourseId,
        month: paymentSelectedMonth,
        status: status,
        method: method,
        updatedAt: new Date().toISOString()
    };

    if (existingIndex !== -1) {
        paymentRecords[existingIndex] = record;
    } else {
        paymentRecords.push(record);
    }

    savePaymentRecords();
    alert('Cập nhật trạng thái thanh toán thành công!');
}

function renderPaymentDetails(courseId, studentId) {
    const course = courses.find(c => c.id === courseId);
    const student = students.find(s => s.id === studentId);

    if (!course || !student) {
        paymentDetailContent.style.display = 'none';
        paymentDetailEmpty.style.display = 'block';
        return;
    }

    paymentDetailEmpty.style.display = 'none';
    paymentDetailContent.style.display = 'block';

    const month = parseInt(paymentSelectedMonth);

    // Load existing payment status
    const existingRecord = paymentRecords.find(r =>
        r.studentId === studentId && r.courseId === courseId && r.month === String(month)
    );
    paymentStatusSelect.value = existingRecord ? existingRecord.status : 'Chưa thanh toán';
    paymentMethodSelect.value = existingRecord ? existingRecord.method : '';
    paymentDetailTitle.textContent = `Thanh Toán - ${student.name} - Tháng ${month}`;

    // Get attendance dates for this course in selected month
    const allDates = getCourseAttendanceDates(courseId).filter(date => {
        return new Date(date).getMonth() + 1 === month;
    });
    const totalSessions = allDates.length;

    // Get student attendance records in selected month
    const studentAttendance = attendances.filter(
        a => a.studentId === studentId && a.courseId === courseId && a.present &&
             new Date(a.date).getMonth() + 1 === month
    );
    const presentDates = studentAttendance.map(a => a.date);
    const presentCount = presentDates.length;
    const absentCount = totalSessions - presentCount;

    // Calculate payment
    const feePerSession = course.fee;
    const totalAmount = presentCount * feePerSession;

    // Get enrollment discount
    const enrollment = enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
    let discountAmount = 0;
    let discountText = 'Không';
    if (enrollment && enrollment.discountType) {
        if (enrollment.discountType === 'percent') {
            discountAmount = totalAmount * enrollment.discountValue / 100;
            discountText = enrollment.discountValue + '%';
        } else if (enrollment.discountType === 'amount') {
            discountAmount = enrollment.discountValue;
            discountText = formatCurrency(enrollment.discountValue);
        }
    }
    const finalAmount = Math.max(0, totalAmount - discountAmount);

    // Render student info
    paymentStudentInfo.innerHTML = `
        <div>
            <span class="info-label">Họ tên:</span>
            <span class="info-value">${student.name}</span>
        </div>
        <div>
            <span class="info-label">SĐT:</span>
            <span class="info-value">${student.phone}</span>
        </div>
        <div>
            <span class="info-label">Khóa học:</span>
            <span class="info-value">${formatCourseName(course)}</span>
        </div>
        <div>
            <span class="info-label">Giảng viên:</span>
            <span class="info-value">${course.instructor}</span>
        </div>
    `;

    // Render attendance table
    paymentAttendanceBody.innerHTML = '';

    if (allDates.length === 0) {
        paymentAttendanceBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center; color:var(--text-light); padding:1rem;">
                    Chưa có dữ liệu điểm danh.
                </td>
            </tr>
        `;
    } else {
        allDates.forEach((date, index) => {
            const isPresent = presentDates.includes(date);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDate(date)}</td>
                <td>
                    <span class="status-badge ${isPresent ? 'status-active' : 'status-inactive'}">
                        ${isPresent ? 'Có mặt' : 'Vắng mặt'}
                    </span>
                </td>
            `;
            paymentAttendanceBody.appendChild(tr);
        });
    }

    // Render payment summary
    paymentSummary.innerHTML = `
        <div class="summary-row">
            <span>Học phí/buổi:</span>
            <span>${formatCurrency(course.fee)}</span>
        </div>
        <div class="summary-row">
            <span>Tổng số buổi:</span>
            <span>${totalSessions} buổi</span>
        </div>
        <div class="summary-row">
            <span>Số buổi đi học:</span>
            <span>${presentCount} buổi</span>
        </div>
        <div class="summary-row">
            <span>Số buổi vắng:</span>
            <span>${absentCount} buổi</span>
        </div>
        <div class="summary-row">
            <span>Tổng tiền:</span>
            <span>${formatCurrency(totalAmount)}</span>
        </div>
        <div class="summary-row">
            <span>Ưu đãi (${discountText}):</span>
            <span>-${formatCurrency(discountAmount)}</span>
        </div>
        <div class="summary-row total">
            <span><strong>SỐ TIỀN CẦN NỘP:</strong></span>
            <span><strong>${formatCurrency(finalAmount)}</strong></span>
        </div>
    `;
}

// ==================== ATTENDANCE FUNCTIONS ====================
function saveAttendances() {
    localStorage.setItem('attendances', JSON.stringify(attendances));
}

function renderAttendanceDropdowns() {
    const currentCourse = attendCourse.value;
    attendCourse.innerHTML = '<option value="">Chọn khóa học</option>';
    courses.filter(c => c.status === 'Đang mở').forEach(c => {
        attendCourse.innerHTML += `<option value="${c.id}">${formatCourseName(c)}</option>`;
    });
    attendCourse.value = currentCourse;
}

function getCourseAttendanceDates(courseId) {
    const dates = [...new Set(attendances.filter(a => a.courseId === courseId).map(a => a.date))];
    return dates.sort((a, b) => a.localeCompare(b));
}

function getStudentAttendanceCount(studentId, courseId) {
    return attendances.filter(a => a.studentId === studentId && a.courseId === courseId).length;
}

function handleAddDate() {
    if (!checkPermission('attendance', 'add')) return;
    const courseId = attendCourse.value;
    const date = attendDate.value;
    const selectedMonth = attendMonth.value;

    if (!courseId) {
        alert('Vui lòng chọn khóa học.');
        return;
    }
    if (!date) {
        alert('Vui lòng chọn ngày.');
        return;
    }

    // Check if date belongs to selected month
    if (selectedMonth) {
        const dateMonth = new Date(date).getMonth() + 1;
        if (dateMonth !== parseInt(selectedMonth)) {
            alert(`Ngày đã chọn không thuộc tháng ${selectedMonth}. Vui lòng chọn ngày trong tháng.`);
            return;
        }
    }

    // Check if date already exists
    const existingDates = getCourseAttendanceDates(courseId);
    if (existingDates.includes(date)) {
        alert('Ngày này đã tồn tại.');
        return;
    }

    // Add empty attendance records for all enrolled students
    const enrolledStudentIds = enrollments
        .filter(e => e.courseId === courseId)
        .map(e => e.studentId);

    enrolledStudentIds.forEach(studentId => {
        attendances.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            courseId: courseId,
            date: date,
            studentId: studentId,
            present: false,
            createdAt: new Date().toISOString()
        });
    });

    saveAttendances();
    renderAttendanceMatrix();
    alert(`Đã thêm ngày ${formatDate(date)} vào bảng điểm danh.`);
}

function renderAttendanceMatrix() {
    const courseId = attendCourse.value;
    const selectedMonth = attendMonth.value;

    if (!courseId) {
        attendanceMatrixSection.style.display = 'none';
        attendanceEmptyMessage.style.display = 'block';
        return;
    }

    // Get enrolled students
    const enrolledStudentIds = enrollments
        .filter(e => e.courseId === courseId)
        .map(e => e.studentId);

    const enrolledStudents = students.filter(s => enrolledStudentIds.includes(s.id));

    if (enrolledStudents.length === 0) {
        attendanceMatrixSection.style.display = 'none';
        attendanceEmptyMessage.style.display = 'block';
        attendanceEmptyMessage.textContent = 'Khóa học chưa có học viên ghi danh.';
        return;
    }

    // Get all dates for this course, filter by selected month
    let dates = getCourseAttendanceDates(courseId);
    if (selectedMonth) {
        dates = dates.filter(d => new Date(d).getMonth() + 1 === parseInt(selectedMonth));
    }

    attendanceEmptyMessage.style.display = 'none';
    attendanceMatrixSection.style.display = 'block';

    const course = courses.find(c => c.id === courseId);
    attendanceMatrixTitle.textContent = `Bảng Điểm Danh - ${course ? formatCourseName(course) : ''}`;

    // Build header
    const canDeleteDate = checkPermission('attendance', 'delete');
    let headerHTML = '<tr><th class="col-stt">STT</th><th class="col-name">Họ Tên</th>';
    dates.forEach(date => {
        const deleteBtn = canDeleteDate ? `<button class="delete-date" onclick="deleteAttendanceDate('${date}')" title="Xóa ngày">✕</button>` : '';
        headerHTML += `<th>
            <div class="date-header">
                <span>${formatDate(date)}</span>
                ${deleteBtn}
            </div>
        </th>`;
    });
    headerHTML += '</tr>';
    attendanceMatrixHead.innerHTML = headerHTML;

    // Build body
    const canEditAttendance = checkPermission('attendance', 'edit');
    attendanceMatrixBody.innerHTML = '';
    enrolledStudents.forEach((student, index) => {
        const tr = document.createElement('tr');
        let rowHTML = `<td class="col-stt">${index + 1}</td><td class="col-name"><strong>${student.name}</strong></td>`;

        dates.forEach(date => {
            const record = attendances.find(
                a => a.studentId === student.id && a.courseId === courseId && a.date === date
            );
            const isChecked = record && record.present;
            const disabled = canEditAttendance ? '' : 'disabled';
            rowHTML += `<td><input type="checkbox" data-student="${student.id}" data-date="${date}" ${isChecked ? 'checked' : ''} ${disabled}></td>`;
        });

        tr.innerHTML = rowHTML;
        attendanceMatrixBody.appendChild(tr);
    });
}

function deleteAttendanceDate(date) {
    if (!checkPermission('attendance', 'delete')) return;
    const courseId = attendCourse.value;
    if (!confirm(`Xóa tất cả dữ liệu điểm danh ngày ${formatDate(date)}?`)) return;

    attendances = attendances.filter(a => !(a.courseId === courseId && a.date === date));
    saveAttendances();
    renderAttendanceMatrix();
}

function handleSaveAttendance() {
    if (!checkPermission('attendance', 'edit')) return;
    const courseId = attendCourse.value;

    if (!courseId) {
        alert('Vui lòng chọn khóa học.');
        return;
    }

    const dates = getCourseAttendanceDates(courseId);
    if (dates.length === 0) {
        alert('Chưa có ngày điểm danh nào.');
        return;
    }

    // Remove old records for this course
    attendances = attendances.filter(a => a.courseId !== courseId);

    // Read all checkboxes and save
    const checkboxes = attendanceMatrixBody.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        attendances.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            courseId: courseId,
            date: cb.dataset.date,
            studentId: cb.dataset.student,
            present: cb.checked,
            createdAt: new Date().toISOString()
        });
    });

    saveAttendances();
    renderPaymentDropdowns();
    alert('Đã lưu điểm danh thành công!');
}

// ==================== EXCEL IMPORT FUNCTIONS ====================
function handleExcelUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    fileName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length < 2) {
                alert('File Excel không có dữ liệu hoặc không đúng định dạng.');
                return;
            }

            // Parse header to find column indices
            const headers = jsonData[0].map(h => String(h).toLowerCase().trim());
            const colMap = {
                stt: headers.findIndex(h => h.includes('stt')),
                name: headers.findIndex(h => h.includes('họ') || h.includes('ten') || h.includes('tên')),
                dob: headers.findIndex(h => h.includes('ngày sinh') || h.includes('ngay sinh') || h.includes('sinh')),
                gender: headers.findIndex(h => h.includes('giới') || h.includes('gioi') || h.includes('giới tính')),
                phone: headers.findIndex(h => h.includes('sđt') || h.includes('sdt') || h.includes('điện thoại') || h.includes('dien thoai') || h.includes('phone')),
                email: headers.findIndex(h => h.includes('email') || h.includes('mail')),
                address: headers.findIndex(h => h.includes('địa chỉ') || h.includes('dia chi') || h.includes('address')),
                discount: headers.findIndex(h => h.includes('ưu đãi') || h.includes('uu dai') || h.includes('discount') || h.includes('ưu'))
            };

            // Validate required columns
            if (colMap.name === -1) {
                alert('Không tìm thấy cột "Họ Tên" trong file Excel. Vui lòng kiểm tra định dạng file.');
                return;
            }

            // Parse data rows
            importedStudents = [];
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (!row || row.length === 0) continue;

                const name = colMap.name >= 0 ? String(row[colMap.name] || '').trim() : '';
                if (!name) continue; // Skip rows without name

                // Parse discount value
                let discountType = '';
                let discountValue = 0;
                if (colMap.discount >= 0) {
                    const discStr = String(row[colMap.discount] || '').trim();
                    if (discStr) {
                        if (discStr.includes('%')) {
                            discountType = 'percent';
                            discountValue = parseFloat(discStr.replace('%', '')) || 0;
                        } else {
                            discountType = 'amount';
                            discountValue = parseFloat(discStr.replace(/[^\d]/g, '')) || 0;
                        }
                    }
                }

                const student = {
                    tempId: i,
                    name: name,
                    dob: parseExcelDate(colMap.dob >= 0 ? row[colMap.dob] : null),
                    gender: colMap.gender >= 0 ? String(row[colMap.gender] || '').trim() : '',
                    phone: colMap.phone >= 0 ? String(row[colMap.phone] || '').trim() : '',
                    email: colMap.email >= 0 ? String(row[colMap.email] || '').trim() : '',
                    address: colMap.address >= 0 ? String(row[colMap.address] || '').trim() : '',
                    discountType: discountType,
                    discountValue: discountValue
                };

                // Normalize gender
                if (student.gender) {
                    const g = student.gender.toLowerCase();
                    if (g.includes('nam') || g === 'm' || g === 'male') student.gender = 'Nam';
                    else if (g.includes('nữ') || g.includes('nu') || g === 'f' || g === 'female') student.gender = 'Nữ';
                }

                importedStudents.push(student);
            }

            if (importedStudents.length === 0) {
                alert('Không tìm thấy dữ liệu học viên hợp lệ trong file.');
                return;
            }

            renderImportPreview();
        } catch (err) {
            alert('Lỗi đọc file Excel: ' + err.message);
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file);
}

function parseExcelDate(value) {
    if (!value) return '';

    // If it's a Date object from SheetJS
    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // If it's a string, try to parse
    const str = String(value).trim();

    // Try YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

    // Try DD/MM/YYYY format
    const match = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (match) {
        const [, day, month, year] = match;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return '';
}

function renderImportPreview() {
    previewTableBody.innerHTML = '';
    previewCount.textContent = importedStudents.length;

    importedStudents.forEach((student, index) => {
        const discountText = student.discountType === 'percent' ? student.discountValue + '%' :
                           student.discountType === 'amount' ? formatCurrency(student.discountValue) : '';

        const tr = document.createElement('tr');
        tr.id = `preview_${student.tempId}`;
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.name)}" data-field="name" data-id="${student.tempId}"></td>
            <td><input type="date" class="preview-edit-input" value="${student.dob}" data-field="dob" data-id="${student.tempId}"></td>
            <td>
                <select class="preview-edit-input" data-field="gender" data-id="${student.tempId}">
                    <option value="">Chọn</option>
                    <option value="Nam" ${student.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                    <option value="Nữ" ${student.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                </select>
            </td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.phone)}" data-field="phone" data-id="${student.tempId}"></td>
            <td><input type="email" class="preview-edit-input" value="${escapeHtml(student.email)}" data-field="email" data-id="${student.tempId}"></td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.address)}" data-field="address" data-id="${student.tempId}"></td>
            <td><input type="text" class="preview-edit-input" value="${discountText}" data-field="discount" data-id="${student.tempId}" placeholder="10% hoặc 500000"></td>
            <td><button class="btn btn-danger btn-sm" onclick="removePreviewRow(${student.tempId})">Xóa</button></td>
        `;
        previewTableBody.appendChild(tr);
    });

    importPreview.style.display = 'block';

    // Add event listeners for inline editing
    document.querySelectorAll('.preview-edit-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const field = this.dataset.field;
            const student = importedStudents.find(s => s.tempId === id);
            if (student) {
                if (field === 'discount') {
                    const val = this.value.trim();
                    if (val.includes('%')) {
                        student.discountType = 'percent';
                        student.discountValue = parseFloat(val.replace('%', '')) || 0;
                    } else if (val) {
                        student.discountType = 'amount';
                        student.discountValue = parseFloat(val.replace(/[^\d]/g, '')) || 0;
                    } else {
                        student.discountType = '';
                        student.discountValue = 0;
                    }
                } else {
                    student[field] = this.value;
                }
            }
        });
    });
}

function removePreviewRow(tempId) {
    importedStudents = importedStudents.filter(s => s.tempId !== tempId);
    if (importedStudents.length === 0) {
        cancelImport();
    } else {
        renderImportPreview();
    }
}

function importAllStudents() {
    if (importedStudents.length === 0) {
        alert('Không có dữ liệu để import.');
        return;
    }

    let imported = 0;
    let skipped = 0;

    importedStudents.forEach(student => {
        // Check duplicate by phone or name+dob
        const isDuplicate = students.some(s =>
            (student.phone && s.phone === student.phone) ||
            (student.name && student.dob && s.name === student.name && s.dob === student.dob)
        );
        if (isDuplicate) {
            skipped++;
            return;
        }

        students.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            name: student.name,
            phone: student.phone,
            email: student.email,
            dob: student.dob,
            gender: student.gender,
            address: student.address,
            status: 'Đang học',
            discountType: student.discountType || '',
            discountValue: student.discountValue || 0,
            createdAt: new Date().toISOString()
        });
        imported++;
    });

    saveStudents();
    cancelImport();
    renderAll();

    let message = `Import thành công ${imported} học viên!`;
    if (skipped > 0) {
        message += `\nBỏ qua ${skipped} học viên trùng (SĐT hoặc Họ tên + Ngày sinh).`;
    }
    alert(message);
}

function cancelImport() {
    importedStudents = [];
    importPreview.style.display = 'none';
    previewTableBody.innerHTML = '';
    excelFileInput.value = '';
    fileName.textContent = 'Chưa chọn file';
}

function downloadTemplate() {
    const templateData = [
        ['STT', 'Họ Tên', 'Ngày Sinh', 'Giới Tính', 'Số Điện Thoại', 'Email', 'Địa Chỉ', 'Ưu Đãi'],
        [1, 'Nguyễn Văn A', '01/01/2000', 'Nam', '0901234567', 'nguyenvana@email.com', '123 Đường ABC, Quận 1', '10%'],
        [2, 'Trần Thị B', '15/03/2001', 'Nữ', '0912345678', 'tranthib@email.com', '456 Đường XYZ, Quận 2', '500000']
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);

    // Set column widths
    ws['!cols'] = [
        { wch: 5 },   // STT
        { wch: 25 },  // Họ Tên
        { wch: 15 },  // Ngày Sinh
        { wch: 12 },  // Giới Tính
        { wch: 15 },  // SĐT
        { wch: 25 },  // Email
        { wch: 30 },  // Địa Chỉ
        { wch: 15 }   // Ưu Đãi
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách học viên');
    XLSX.writeFile(wb, 'mau_danh_sach_hoc_vien.xlsx');
}

// ==================== IMPORT & ENROLL FUNCTIONS ====================
function downloadImportEnrollTemplate() {
    downloadTemplate(); // Same template format
}

function handleImportEnrollUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    importEnrollFileName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array', cellDates: true });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (jsonData.length < 2) {
                alert('File Excel không có dữ liệu hoặc không đúng định dạng.');
                return;
            }

            const headers = jsonData[0].map(h => String(h).toLowerCase().trim());
            const colMap = {
                stt: headers.findIndex(h => h.includes('stt')),
                name: headers.findIndex(h => h.includes('họ') || h.includes('ten') || h.includes('tên')),
                dob: headers.findIndex(h => h.includes('ngày sinh') || h.includes('ngay sinh') || h.includes('sinh')),
                gender: headers.findIndex(h => h.includes('giới') || h.includes('gioi') || h.includes('giới tính')),
                phone: headers.findIndex(h => h.includes('sđt') || h.includes('sdt') || h.includes('điện thoại') || h.includes('dien thoai') || h.includes('phone')),
                email: headers.findIndex(h => h.includes('email') || h.includes('mail')),
                address: headers.findIndex(h => h.includes('địa chỉ') || h.includes('dia chi') || h.includes('address')),
                discount: headers.findIndex(h => h.includes('ưu đãi') || h.includes('uu dai') || h.includes('discount') || h.includes('ưu'))
            };

            if (colMap.name === -1) {
                alert('Không tìm thấy cột "Họ Tên" trong file Excel. Vui lòng kiểm tra định dạng file.');
                return;
            }

            importEnrollStudents = [];
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (!row || row.length === 0) continue;

                const name = colMap.name >= 0 ? String(row[colMap.name] || '').trim() : '';
                if (!name) continue;

                let discountType = '';
                let discountValue = 0;
                if (colMap.discount >= 0) {
                    const discStr = String(row[colMap.discount] || '').trim();
                    if (discStr) {
                        if (discStr.includes('%')) {
                            discountType = 'percent';
                            discountValue = parseFloat(discStr.replace('%', '')) || 0;
                        } else {
                            discountType = 'amount';
                            discountValue = parseFloat(discStr.replace(/[^\d]/g, '')) || 0;
                        }
                    }
                }

                const student = {
                    tempId: i,
                    name: name,
                    dob: parseExcelDate(colMap.dob >= 0 ? row[colMap.dob] : null),
                    gender: colMap.gender >= 0 ? String(row[colMap.gender] || '').trim() : '',
                    phone: colMap.phone >= 0 ? String(row[colMap.phone] || '').trim() : '',
                    email: colMap.email >= 0 ? String(row[colMap.email] || '').trim() : '',
                    address: colMap.address >= 0 ? String(row[colMap.address] || '').trim() : '',
                    discountType: discountType,
                    discountValue: discountValue
                };

                if (student.gender) {
                    const g = student.gender.toLowerCase();
                    if (g.includes('nam') || g === 'm' || g === 'male') student.gender = 'Nam';
                    else if (g.includes('nữ') || g.includes('nu') || g === 'f' || g === 'female') student.gender = 'Nữ';
                }

                importEnrollStudents.push(student);
            }

            if (importEnrollStudents.length === 0) {
                alert('Không tìm thấy dữ liệu học viên hợp lệ trong file.');
                return;
            }

            renderImportEnrollPreview();
        } catch (err) {
            alert('Lỗi đọc file Excel: ' + err.message);
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderImportEnrollPreview() {
    importEnrollPreviewBody.innerHTML = '';
    importEnrollPreviewCount.textContent = importEnrollStudents.length;

    importEnrollStudents.forEach((student, index) => {
        const discountText = student.discountType === 'percent' ? student.discountValue + '%' :
                           student.discountType === 'amount' ? formatCurrency(student.discountValue) : '';

        const tr = document.createElement('tr');
        tr.id = `importEnrollPreview_${student.tempId}`;
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.name)}" data-field="name" data-id="${student.tempId}"></td>
            <td><input type="date" class="preview-edit-input" value="${student.dob}" data-field="dob" data-id="${student.tempId}"></td>
            <td>
                <select class="preview-edit-input" data-field="gender" data-id="${student.tempId}">
                    <option value="">Chọn</option>
                    <option value="Nam" ${student.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                    <option value="Nữ" ${student.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                </select>
            </td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.phone)}" data-field="phone" data-id="${student.tempId}"></td>
            <td><input type="email" class="preview-edit-input" value="${escapeHtml(student.email)}" data-field="email" data-id="${student.tempId}"></td>
            <td><input type="text" class="preview-edit-input" value="${escapeHtml(student.address)}" data-field="address" data-id="${student.tempId}"></td>
            <td><input type="text" class="preview-edit-input" value="${discountText}" data-field="discount" data-id="${student.tempId}" placeholder="10% hoặc 500000"></td>
            <td><button class="btn btn-danger btn-sm" onclick="removeImportEnrollPreviewRow(${student.tempId})">Xóa</button></td>
        `;
        importEnrollPreviewBody.appendChild(tr);
    });

    importEnrollPreview.style.display = 'block';

    document.querySelectorAll('#importEnrollPreviewBody .preview-edit-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const field = this.dataset.field;
            const student = importEnrollStudents.find(s => s.tempId === id);
            if (student) {
                if (field === 'discount') {
                    const val = this.value.trim();
                    if (val.includes('%')) {
                        student.discountType = 'percent';
                        student.discountValue = parseFloat(val.replace('%', '')) || 0;
                    } else if (val) {
                        student.discountType = 'amount';
                        student.discountValue = parseFloat(val.replace(/[^\d]/g, '')) || 0;
                    } else {
                        student.discountType = '';
                        student.discountValue = 0;
                    }
                } else {
                    student[field] = this.value;
                }
            }
        });
    });
}

function removeImportEnrollPreviewRow(tempId) {
    importEnrollStudents = importEnrollStudents.filter(s => s.tempId !== tempId);
    if (importEnrollStudents.length === 0) {
        cancelImportEnroll();
    } else {
        renderImportEnrollPreview();
    }
}

function importAndEnrollAll() {
    if (importEnrollStudents.length === 0) {
        alert('Không có dữ liệu để import.');
        return;
    }

    const courseId = importEnrollCourse.value;
    if (!courseId) {
        alert('Vui lòng chọn khóa học ghi danh.');
        return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) {
        alert('Khóa học không tồn tại.');
        return;
    }

    // Check capacity
    const currentEnrollments = enrollments.filter(e => e.courseId === courseId).length;
    const availableSlots = course.maxStudents - currentEnrollments;
    if (availableSlots <= 0) {
        alert('Khóa học đã đầy, không thể thêm học viên.');
        return;
    }
    if (importEnrollStudents.length > availableSlots) {
        if (!confirm(`Khóa học chỉ còn ${availableSlots} chỗ trống, nhưng có ${importEnrollStudents.length} học viên muốn ghi danh. Chỉ ${availableSlots} học viên đầu tiên sẽ được ghi danh. Tiếp tục?`)) return;
    }

    const enrollDate = importEnrollDate.value || new Date().toISOString().split('T')[0];
    let imported = 0;
    let skipped = 0;
    let enrolled = 0;
    let slotsUsed = 0;

    importEnrollStudents.forEach(student => {
        // Check duplicate by phone or name+dob
        const isDuplicate = students.some(s =>
            (student.phone && s.phone === student.phone) ||
            (student.name && student.dob && s.name === student.name && s.dob === student.dob)
        );
        if (isDuplicate) {
            skipped++;
            return;
        }

        // Create new student
        const newStudentId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
        students.push({
            id: newStudentId,
            name: student.name,
            phone: student.phone,
            email: student.email,
            dob: student.dob,
            gender: student.gender,
            address: student.address,
            status: 'Đang học',
            discountType: student.discountType || '',
            discountValue: student.discountValue || 0,
            createdAt: new Date().toISOString()
        });
        imported++;

        // Enroll in course if slots available
        if (slotsUsed < availableSlots) {
            // Check duplicate enrollment
            const alreadyEnrolled = enrollments.some(e => e.studentId === newStudentId && e.courseId === courseId);
            if (!alreadyEnrolled) {
                enrollments.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    studentId: newStudentId,
                    courseId: courseId,
                    date: enrollDate,
                    discountType: student.discountType || '',
                    discountValue: student.discountValue || 0,
                    createdAt: new Date().toISOString()
                });
                enrolled++;
                slotsUsed++;
            }
        }
    });

    saveStudents();
    saveEnrollments();
    cancelImportEnroll();
    renderAll();

    let message = `Import thành công ${imported} học viên!`;
    if (enrolled > 0) {
        message += `\nĐã ghi danh ${enrolled} học viên vào khóa "${formatCourseName(course)}".`;
    }
    if (skipped > 0) {
        message += `\nBỏ qua ${skipped} học viên trùng (SĐT hoặc Họ tên + Ngày sinh).`;
    }
    alert(message);
}

function cancelImportEnroll() {
    importEnrollStudents = [];
    importEnrollPreview.style.display = 'none';
    importEnrollPreviewBody.innerHTML = '';
    importEnrollFileInput.value = '';
    importEnrollFileName.textContent = 'Chưa chọn file';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}
