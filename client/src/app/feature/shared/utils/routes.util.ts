import { RouteConfig } from "./route-config";

export class RoutesUtil {
  static Home = new RouteConfig('home');

  // static Auth = new RouteConfig('auth');
  static AuthLogin = new RouteConfig('login', RoutesUtil.Home);

  static Dashboard = new RouteConfig('dashboard');

  //user
  static User = new RouteConfig('user');
  static UserProfile = new RouteConfig<{ id: number }>('profile/:id', RoutesUtil.User);
  static UserList = new RouteConfig('list', RoutesUtil.User);
  static AddUser = new RouteConfig('add', RoutesUtil.User);
  static AddParent = new RouteConfig('add-Parent', RoutesUtil.User);

  //director
  static Director = new RouteConfig('director');
  static DirectorProfile = new RouteConfig<{ id: number }>('profile/:id', RoutesUtil.Director);
  static DirectorList = new RouteConfig('list', RoutesUtil.Director);
  static AddDirector = new RouteConfig('add', RoutesUtil.Director);

  //teacher
  static Teacher = new RouteConfig('teacher');
  static TeacherProfile = new RouteConfig<{ id: number }>('profile/:id', RoutesUtil.Teacher);
  static TeacherList = new RouteConfig('list', RoutesUtil.Teacher);
  static AddTeacher = new RouteConfig('add', RoutesUtil.Teacher);

  //parent
  // static Parent = new RouteConfig('parent');
  // static ParentProfile = new RouteConfig<{ id: number }>('profile/:id', RoutesUtil.Parent);
  // static ParentList = new RouteConfig('list', RoutesUtil.Parent);

  //domain
  static Domain = new RouteConfig('domain');
  static DomainView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.Domain);
  static DomainList = new RouteConfig('list', RoutesUtil.Domain);
  static AddDomain = new RouteConfig('add', RoutesUtil.Domain);

  //class room
  static ClassRoom = new RouteConfig('class-room');
  static ClassRoomView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.ClassRoom);
  static ClassRoomList = new RouteConfig('list', RoutesUtil.ClassRoom);
  static AddClassRoom = new RouteConfig('add', RoutesUtil.ClassRoom);
  static SkillsList = new RouteConfig('skill', RoutesUtil.ClassRoom);
  static ActivityList = new RouteConfig('activity', RoutesUtil.ClassRoom);

  //class Student
  static Student = new RouteConfig('student');
  static StudentView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.Student);
  static StudentList = new RouteConfig('list', RoutesUtil.Student);
  static AddStudent = new RouteConfig('add', RoutesUtil.Student);

  //school
  static School = new RouteConfig('school');
  static SchoolView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.School);
  static SchoolList = new RouteConfig('list', RoutesUtil.School);
  static AddSchool = new RouteConfig('add', RoutesUtil.School);

  //invoice
  static Invoice = new RouteConfig('invoice');
  static SchoolInvoiceList = new RouteConfig('School-list', RoutesUtil.Invoice);
  static StudentInvoiceList = new RouteConfig('student-list', RoutesUtil.Invoice);

  //Social
  static Social = new RouteConfig('social');
  static SocialEmail = new RouteConfig('email', RoutesUtil.Social);
  static SocialTicket = new RouteConfig('tickets', RoutesUtil.Social);
  static SocialEvents = new RouteConfig('events', RoutesUtil.Social);

  //Group
  static Group = new RouteConfig('group');
  static GroupList = new RouteConfig('list', RoutesUtil.Group);

  //cycle
  static Cycle = new RouteConfig('cycle');
  static CycleDomains = new RouteConfig('domains', RoutesUtil.Cycle);
}
