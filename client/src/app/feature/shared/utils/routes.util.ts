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
  static Parent = new RouteConfig('parent');
  static ParentProfile = new RouteConfig<{ id: number }>('profile/:id', RoutesUtil.Parent);
  static ParentList = new RouteConfig('list', RoutesUtil.Parent);
  static AddParent = new RouteConfig('add', RoutesUtil.Parent);

  //subject
  static Subject = new RouteConfig('subject');
  static SubjectView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.Subject);
  static SubjectList = new RouteConfig('list', RoutesUtil.Subject);
  static AddSubject = new RouteConfig('add', RoutesUtil.Subject);

  //class room
  static ClassRoom = new RouteConfig('class-room');
  static ClassRoomView = new RouteConfig<{ id: number }>('view/:id', RoutesUtil.ClassRoom);
  static ClassRoomList = new RouteConfig('list', RoutesUtil.ClassRoom);
  static AddClassRoom = new RouteConfig('add', RoutesUtil.ClassRoom);
  static TopicsList = new RouteConfig('topic', RoutesUtil.ClassRoom);

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
}
