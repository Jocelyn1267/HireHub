from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import uuid  # 用于生成唯一的 id
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['WTF_CSRF_ENABLED'] = False  # 禁用 CSRF

db = SQLAlchemy(app)
CORS(app)


# 数据库模型
class User(db.Model):
    id = db.Column(db.String(50), primary_key=True)  # 改为字符串类型以支持 'e860'
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=True, default="student")


class Course(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    img_alt = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    course_title = db.Column(db.String(200), nullable=False)
    course_link = db.Column(db.String(200), nullable=True)
    course_description = db.Column(db.Text, nullable=True)


class UserCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.String(50), db.ForeignKey('course.id'), nullable=False)


class Message(db.Model):
    messageId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender_email = db.Column(db.String(120), nullable=False)
    receiver_email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=True)
    text = db.Column(db.Text, nullable=False)
    id = db.Column(db.String(50), unique=True, nullable=False)


class Rating(db.Model):
    ratingId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.String(50), db.ForeignKey('course.id'), nullable=False)
    value = db.Column(db.Float, nullable=False)


class Video(db.Model):
    videoid = db.Column(db.String(50), primary_key=True)
    courseid = db.Column(db.String(50), db.ForeignKey('course.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 状态: pending, approve, delete
    url = db.Column(db.String(200), nullable=False)
    video_title = db.Column(db.String(200), nullable=False)


# 初始化数据函数
def initialize_data():
    # 检查数据库中是否已有数据
    if User.query.count() == 0:  # 如果没有用户数据，则初始化
        # 初始化用户数据
        default_users = [
            {"id": "1", "email": "baoyijie111@gmail.com", "password": "123456", "role": "student"},
            {"id": "2", "email": "instructor1@example.com", "password": "instructor123", "role": "instructor"},
            {"id": "3", "email": "admin1@example.com", "password": "admin123", "role": "admin"},
            {"id": "4", "email": "student2@example.com", "password": "student456", "role": "student"},
            {"id": "5", "email": "instructor2@example.com", "password": "instructor456", "role": "instructor"},
            {"id": "6", "email": "admin2@example.com", "password": "admin456", "role": "admin"},
            {"id": "e860", "email": "1", "password": "1", "role": None},
        ]

        # 插入用户数据
        for user in default_users:
            db.session.add(User(**user))
        db.session.commit()
        print("Initialized default users.")

        # 初始化课程数据
        if Course.query.count() == 0:
            default_courses = [
                {
                    "id": "1",
                    "img_alt": "Introduction to Computer Science",
                    "image_url": "./image/courseCard1.png",
                    "course_title": "Introduction to Computer Science",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Dive into the fundamentals of computer science. This course covers core concepts, including algorithms, data structures, and computational thinking. Gain a strong foundation to build your skills in programming and problem-solving, tailored for both beginners and enthusiasts."
                    )
                },
                {
                    "id": "2",
                    "img_alt": "Web Development Basics",
                    "image_url": "./image/courseCard2.png",
                    "course_title": "Web Development Basics",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Learn the essentials of creating stunning websites. This course introduces HTML, CSS, and JavaScript, guiding you through the process of building responsive and interactive web applications. Perfect for anyone looking to start their journey in web development."
                    )
                },
                {
                    "id": "3",
                    "img_alt": "Data Structures and Algorithms",
                    "image_url": "./image/courseCard3.png",
                    "course_title": "Data Structures and Algorithms",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Master the art of efficient problem-solving with data structures and algorithms. This course covers stacks, queues, trees, graphs, and sorting algorithms, preparing you for coding challenges and real-world applications in software development."
                    )
                },
                {
                    "id": "4",
                    "img_alt": "Introduction to Machine Learning",
                    "image_url": "./image/courseCard4.png",
                    "course_title": "Introduction to Machine Learning",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Explore the fascinating world of machine learning. This course covers supervised and unsupervised learning, neural networks, and hands-on projects using Python. Designed for anyone interested in AI and data science."
                    )
                },
                {
                    "id": "5",
                    "img_alt": "Database Management Systems",
                    "image_url": "./image/courseCard5.png",
                    "course_title": "Database Management Systems",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Understand the principles of database design and management. This course introduces relational databases, SQL, and advanced topics like normalization and indexing, providing the tools needed for efficient data storage and retrieval."
                    )
                },
                {
                    "id": "6",
                    "img_alt": "Operating Systems Concepts",
                    "image_url": "./image/courseCard6.png",
                    "course_title": "Operating Systems Concepts",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Discover the inner workings of operating systems. Topics include process management, memory management, file systems, and concurrency. This course offers in-depth knowledge for aspiring system programmers and engineers."
                    )
                },
                {
                    "id": "7",
                    "img_alt": "Computer Networks",
                    "image_url": "./image/courseCard7.png",
                    "course_title": "Computer Networks",
                    "course_link": "/coursePage",
                    "course_description": (
                        "Learn the fundamentals of computer networking. This course covers protocols, network architectures, and technologies like TCP/IP and HTTP, preparing you to design and troubleshoot modern communication networks."
                    )
                }
            ]
            for course in default_courses:
                db.session.add(Course(**course))
            db.session.commit()
            # 初始化用户与课程的关系数据
            if UserCourse.query.count() == 0:
                user_courses = [
                    {"user_id": "1", "course_id": "1"},
                    {"user_id": "1", "course_id": "2"},
                    {"user_id": "2", "course_id": "2"},
                    {"user_id": "2", "course_id": "3"},
                ]
                for relation in user_courses:
                    db.session.add(UserCourse(**relation))
                db.session.commit()
            if Message.query.count() == 0:
                default_messages = [
                    {
                        "messageId": 1,
                        "sender_email": "baoyijie111@gmail.com",
                        "receiver_email": "instructor1@example.com",
                        "subject": "Collaboration Inquiry",
                        "text": "Hello, I am a student interested in collaborating with you on a new project related to advanced Python. Let me know if you're available to discuss.",
                        "id": "m1"
                    },
                    {
                        "messageId": 2,
                        "sender_email": "instructor1@example.com",
                        "receiver_email": "admin1@example.com",
                        "subject": "Request for Resource Allocation",
                        "text": "Dear Admin, I would like to request additional resources for the advanced Python course. Could you assist in arranging this?",
                        "id": "m2"
                    },
                    {
                        "messageId": 3,
                        "sender_email": "admin1@example.com",
                        "receiver_email": "student2@example.com",
                        "subject": "Account Notification",
                        "text": "Hi, your account has been updated successfully. If you encounter any issues, please contact support.",
                        "id": "m3"
                    },
                    {
                        "messageId": 4,
                        "sender_email": "student2@example.com",
                        "receiver_email": "instructor2@example.com",
                        "subject": "Assignment Question",
                        "text": "Hello, I have a question regarding the assignment due next week. Could you please clarify the requirements for the second section?",
                        "id": "m4"
                    },
                    {
                        "messageId": 5,
                        "sender_email": "instructor2@example.com",
                        "receiver_email": "admin2@example.com",
                        "subject": "System Access Issue",
                        "text": "Hi Admin, I am facing issues accessing the grading system. Could you look into this matter?",
                        "id": "m5"
                    },
                    {
                        "messageId": 6,
                        "sender_email": "admin2@example.com",
                        "receiver_email": "baoyijie111@gmail.com",
                        "subject": "Welcome to the Platform",
                        "text": "Hi, welcome to the learning platform. Please explore the available resources and courses. Let us know if you need any assistance.",
                        "id": "m6"
                    }
                ]

                for msg in default_messages:
                    db.session.add(Message(**msg))
                db.session.commit()

            if Rating.query.count() == 0:
                default_ratings = [
                    {"student_id": "1", "course_id": "1", "value": 4.5},
                    {"student_id": "1", "course_id": "2", "value": 3.8},
                    {"student_id": "2", "course_id": "1", "value": 4.0},
                ]
                for rating in default_ratings:
                    db.session.add(Rating(**rating))
                db.session.commit()
            # 初始化视频数据
            if Video.query.count() == 0:
                default_videos = [
                    {
                        "videoid": "1",
                        "courseid": "1",
                        "status": "approve",
                        "url": "https://example.com/video1",
                        "video_title": "Introduction to Course"
                    },
                    {
                        "videoid": "2",
                        "courseid": "1",
                        "status": "pending",
                        "url": "https://example.com/video2",
                        "video_title": "Course Basics"
                    },
                    {
                        "videoid": "3",
                        "courseid": "2",
                        "status": "delete",
                        "url": "https://example.com/video3",
                        "video_title": "Advanced Techniques"
                    },
                    {
                        "videoid": "4",
                        "courseid": "2",
                        "status": "approve",
                        "url": "https://example.com/video4",
                        "video_title": "Final Overview"
                    },
                    {
                        "videoid": "5",
                        "courseid": "3",
                        "status": "pending",
                        "url": "https://example.com/video5",
                        "video_title": "Introduction to Algorithms"
                    },
                    {
                        "videoid": "6",
                        "courseid": "3",
                        "status": "pending",
                        "url": "https://example.com/video6",
                        "video_title": "Data Structures Basics"
                    },
                    {
                        "videoid": "7",
                        "courseid": "4",
                        "status": "pending",
                        "url": "https://example.com/video7",
                        "video_title": "Getting Started with Machine Learning"
                    },
                    {
                        "videoid": "8",
                        "courseid": "4",
                        "status": "pending",
                        "url": "https://example.com/video8",
                        "video_title": "Supervised Learning Techniques"
                    },
                    {
                        "videoid": "9",
                        "courseid": "5",
                        "status": "pending",
                        "url": "https://example.com/video9",
                        "video_title": "Introduction to Databases"
                    },
                    {
                        "videoid": "10",
                        "courseid": "5",
                        "status": "pending",
                        "url": "https://example.com/video10",
                        "video_title": "Advanced SQL Queries"
                    },
                    {
                        "videoid": "11",
                        "courseid": "6",
                        "status": "pending",
                        "url": "https://example.com/video11",
                        "video_title": "Process Management Overview"
                    },
                    {
                        "videoid": "12",
                        "courseid": "6",
                        "status": "pending",
                        "url": "https://example.com/video12",
                        "video_title": "Concurrency in Operating Systems"
                    },
                    {
                        "videoid": "13",
                        "courseid": "7",
                        "status": "pending",
                        "url": "https://example.com/video13",
                        "video_title": "Introduction to Networking"
                    },
                    {
                        "videoid": "14",
                        "courseid": "7",
                        "status": "pending",
                        "url": "https://example.com/video14",
                        "video_title": "TCP/IP Protocol Basics"
                    }
                ]
                for video in default_videos:
                    db.session.add(Video(**video))
                db.session.commit()


# 创建数据库并初始化数据
with app.app_context():
    db.create_all()
    initialize_data()


# 用户相关路由
@app.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([{'id': u.id, 'email': u.email, 'role': u.role} for u in users])
    elif request.method == 'POST':
        data = request.json
        new_user = User(
            id=data['id'],
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'student')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'id': new_user.id, 'email': new_user.email, 'role': new_user.role})


# 登录接口
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    # 查找用户
    user = User.query.filter_by(email=email, password=password).first()

    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }), 200
    else:
        return jsonify({"message": "Invalid email or password."}), 401


# 注册接口
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student')

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists."}), 409

    # 创建用户
    new_user = User(
        id=str(uuid.uuid4()),  # 使用 UUID 生成唯一 id
        email=email,
        password=password,
        role=role
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "role": new_user.role
        }
    }), 201


# 路由：获取所有课程
from flask import request, jsonify


@app.route('/courses', methods=['GET'])
def get_courses():
    # Get the optional 'id' parameter from the query string
    course_id = request.args.get('id')

    if course_id:
        # If an 'id' is provided, filter for the specific course
        course = Course.query.filter_by(id=course_id).first()
        if course:
            return jsonify({
                "id": course.id,
                "img_alt": course.img_alt,
                "image_url": course.image_url,
                "course_title": course.course_title,
                "course_link": course.course_link,
                "course_description": course.course_description,
            })
        else:
            # Return 404 if the course with the given ID is not found
            return jsonify({"error": "Course not found"}), 404
    else:
        # If no 'id' is provided, return all courses
        courses = Course.query.all()
        return jsonify([
            {
                "id": course.id,
                "img_alt": course.img_alt,
                "image_url": course.image_url,
                "course_title": course.course_title,
                "course_link": course.course_link,
                "course_description": course.course_description,
            }
            for course in courses
        ])


@app.route('/courses/<id>', methods=['GET'])
def get_course_by_id(id):
    # Query the database for the course with the given string ID
    course = Course.query.filter_by(id=id).first()
    if course:
        return jsonify({
            "id": course.id,
            "img_alt": course.img_alt,
            "image_url": course.image_url,
            "course_title": course.course_title,
            "course_link": course.course_link,
            "course_description": course.course_description,
        })
    else:
        # If the course is not found, return a 404 error
        return jsonify({"error": "Course not found"}), 404


# Instructor’s course list
@app.route('/instructor_courses', methods=['GET'])
def instructor_courses():
    user_id = request.args.get('user_id')
    offset = int(request.args.get('offset', 0))
    count = int(request.args.get('count', 10))

    if not user_id:
        return jsonify({"message": "user_id is required"}), 400

    # Query courses associated with the instructor
    courses = (
        db.session.query(
            Course.id,
            Course.img_alt,
            Course.image_url,
            Course.course_title,
            Course.course_link,
            Course.course_description
        )
        .join(UserCourse, UserCourse.course_id == Course.id)
        .join(User, User.id == UserCourse.user_id)
        .filter(User.id == user_id, User.role == 'instructor')
        .offset(offset)
        .limit(count)
        .all()
    )

    # Format the response
    response = [
        {
            "courseId": c.id,
            "img_alt": c.img_alt,
            "image_url": c.image_url,
            "course_title": c.course_title,
            "course_link": c.course_link,
            "course_description": c.course_description,
        }
        for c in courses
    ]

    return jsonify(response)


@app.route('/student_courses', methods=['GET'])
def student_courses():
    user_id = request.args.get('user_id')
    offset = int(request.args.get('offset', 0))
    count = int(request.args.get('count', 10))

    if not user_id:
        return jsonify({"message": "user_id is required"}), 400

    # Query courses associated with the student
    courses = (
        db.session.query(
            Course.id,
            Course.img_alt,
            Course.image_url,
            Course.course_title,
            Course.course_link,
            Course.course_description
        )
        .join(UserCourse, UserCourse.course_id == Course.id)
        .join(User, User.id == UserCourse.user_id)
        .filter(User.id == user_id, User.role == 'student')
        .offset(offset)
        .limit(count)
        .all()
    )

    # Format the response
    response = [
        {
            "courseId": c.id,
            "img_alt": c.img_alt,
            "image_url": c.image_url,
            "course_title": c.course_title,
            "course_link": c.course_link,
            "course_description": c.course_description,
        }
        for c in courses
    ]

    return jsonify(response)


# Search list
@app.route('/search_courses', methods=['GET'])
def search_courses():
    keyword = request.args.get('keyword', '')
    offset = int(request.args.get('offset', 0))
    count = int(request.args.get('count', 10))

    # Query the database to search for courses
    courses = (
        db.session.query(
            Course.id,
            Course.img_alt,
            Course.image_url,
            Course.course_title,
            Course.course_link,
            Course.course_description
        )
        .filter(Course.course_title.ilike(f"%{keyword}%"))
        .offset(offset)
        .limit(count)
        .all()
    )

    # Format the response to include all the relevant fields
    response = [
        {
            "courseId": c.id,
            "img_alt": c.img_alt,
            "image_url": c.image_url,
            "course_title": c.course_title,
            "course_link": c.course_link,
            "course_description": c.course_description,
        }
        for c in courses
    ]

    return jsonify(response)


# Enroll接口：将用户和课程的关系保存到关系表
@app.route('/enroll', methods=['POST'])
def enroll():
    data = request.json
    user_id = data.get('user_id')
    course_id = data.get('course_id')

    if not user_id or not course_id:
        return jsonify({"message": "user_id and course_id are required"}), 400

    # 检查用户和课程是否存在
    user = User.query.get(user_id)
    course = Course.query.get(course_id)

    if not user:
        return jsonify({"message": f"User with id {user_id} does not exist"}), 404
    if not course:
        return jsonify({"message": f"Course with id {course_id} does not exist"}), 404

    # 检查关系是否已存在
    existing_relation = UserCourse.query.filter_by(user_id=user_id, course_id=course_id).first()
    if existing_relation:
        return jsonify({"message": "User is already enrolled in this course"}), 409

    # 创建新的关系
    new_relation = UserCourse(user_id=user_id, course_id=course_id)
    db.session.add(new_relation)
    db.session.commit()

    return jsonify({"message": "User successfully enrolled in course"}), 201


@app.route('/inbox', methods=['GET'])
def inbox_list():
    receiver_email = request.args.get('receiver_email')
    offset = int(request.args.get('offset', 0))
    count = int(request.args.get('count', 10))

    if not receiver_email:
        return jsonify({"message": "receiver_email is required"}), 400

    messages = (
        Message.query.filter_by(receiver_email=receiver_email)
        .order_by(Message.messageId)
        .offset(offset)
        .limit(count)
        .all()
    )

    result = [
        {"messageId": msg.messageId, "sender_email": msg.sender_email, "text": msg.text[:1000]}
        for msg in messages
    ]

    return jsonify(result)


@app.route('/send', methods=['POST'])
def send_message():
    data = request.json
    sender_email = data.get('sender_email')
    receiver_email = data.get('receiver_email')
    text = data.get('text')

    if not sender_email or not receiver_email or not text:
        return jsonify({"message": "sender_email, receiver_email, and text are required"}), 400

    new_message = Message(
        sender_email=sender_email,
        receiver_email=receiver_email,
        subject=data.get('subject', ''),
        text=text,
        id=str(uuid.uuid4())[:8]  # 生成唯一ID
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully", "messageId": new_message.messageId}), 201


@app.route('/messages', methods=['GET'])
def get_all_messages():
    messages = Message.query.order_by(Message.messageId).all()
    result = [
        {
            "messageId": msg.messageId,
            "sender_email": msg.sender_email,
            "receiver_email": msg.receiver_email,
            "subject": msg.subject,
            "text": msg.text,
            "id": msg.id
        }
        for msg in messages
    ]
    return jsonify(result)


@app.route('/add_rate', methods=['POST'])
def add_rate():
    data = request.json
    student_id = data.get('student_id')
    course_id = data.get('course_id')
    value = data.get('value')

    if not student_id or not course_id or value is None:
        return jsonify({"message": "student_id, course_id, and value are required"}), 400

    # 检查用户是否是学生
    student = User.query.filter_by(id=student_id, role="student").first()
    if not student:
        return jsonify({"message": "Only students can rate courses"}), 403

    # 检查课程是否存在
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": f"Course with id {course_id} does not exist"}), 404

    # 检查评分值是否在合法范围
    if not (0 <= value <= 5):
        return jsonify({"message": "Rating value must be between 0 and 5"}), 400

    # 添加评分
    new_rating = Rating(student_id=student_id, course_id=course_id, value=value)
    db.session.add(new_rating)
    db.session.commit()

    return jsonify({"message": "Rating added successfully", "ratingId": new_rating.ratingId}), 201


@app.route('/view_course_rate', methods=['GET'])
def view_course_rate():
    course_id = request.args.get('course_id')

    if not course_id:
        return jsonify({"message": "course_id is required"}), 400

    # 检查课程是否存在
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": f"Course with id {course_id} does not exist"}), 404

    # 计算课程的平均评分
    ratings = Rating.query.filter_by(course_id=course_id).all()
    if not ratings:
        return jsonify({"message": "No ratings for this course", "value": None}), 200

    average_value = sum(r.value for r in ratings) / len(ratings)
    return jsonify({"course_id": course_id, "average_value": average_value}), 200


@app.route('/current_video_list', methods=['GET'])
def current_video_list():
    course_id = request.args.get('course_id')
    role = request.args.get('role')

    if not course_id or not role:
        return jsonify({"message": "course_id and role are required"}), 400

    # 查询逻辑
    query = Video.query.filter_by(courseid=course_id)
    if role == "student":
        query = query.filter_by(status="approve")

    videos = query.all()

    result = [
        {
            "videoid": video.videoid,
            "status": video.status,
            "url": video.url,
            "video_title": video.video_title
        }
        for video in videos
    ]

    return jsonify(result)


@app.route('/pending_video_list', methods=['GET'])
def pending_video_list():
    offset = int(request.args.get('offset', 0))
    count = int(request.args.get('count', 10))

    videos = (
        Video.query.filter_by(status="pending")
        .offset(offset)
        .limit(count)
        .all()
    )

    result = [
        {
            "videoid": video.videoid,
            "status": video.status,
            "url": video.url,
            "video_title": video.video_title
        }
        for video in videos
    ]

    return jsonify(result)


import uuid


@app.route('/course', methods=['POST'])
def add_or_update_course():
    data = request.json

    if not data:
        return jsonify({"message": "Request body is missing"}), 400

    # 获取课程 ID
    course_id = data.get('id')

    if course_id:
        # 如果传入了 course_id，则尝试获取课程
        course = Course.query.get(course_id)
        if course:
            # 更新课程
            course.img_alt = data.get('img_alt', course.img_alt)
            course.image_url = data.get('image_url', course.image_url)
            course.course_title = data.get('course_title', course.course_title)
            course.course_link = data.get('course_link', course.course_link)
            course.course_description = data.get('course_description', course.course_description)
            db.session.commit()
            return jsonify({"message": "Course updated successfully", "course_id": course_id}), 200
        else:
            return jsonify({"message": f"Course with ID {course_id} does not exist"}), 404
    else:
        # 如果未传入 course_id，则新增课程并生成唯一 ID
        new_course_id = str(uuid.uuid4())  # 使用 UUID 生成唯一 ID
        new_course = Course(
            id=new_course_id,
            img_alt=data.get('img_alt', ''),
            image_url=data.get('image_url', './image/courseCard0.png'),
            course_title=data.get('course_title', ''),
            course_link=data.get('course_link', ''),
            course_description=data.get('course_description', '')
        )
        db.session.add(new_course)
        db.session.commit()
        return jsonify({"message": "Course added successfully", "course_id": new_course_id}), 201


@app.route('/video', methods=['POST'])
def add_or_update_video():
    data = request.json

    if not data:
        return jsonify({"message": "Request body is missing"}), 400

    # 获取视频 ID
    video_id = data.get('videoid')

    if video_id:
        # 如果传入了 video_id，则尝试获取视频
        video = Video.query.get(video_id)
        if video:
            # 更新视频
            video.courseid = data.get('courseid', video.courseid)
            video.status = data.get('status', video.status)
            video.url = data.get('url', video.url)
            video.video_title = data.get('video_title', video.video_title)
            db.session.commit()
            return jsonify({"message": "Video updated successfully", "videoid": video_id}), 200
        else:
            return jsonify({"message": f"Video with ID {video_id} does not exist"}), 404
    else:
        # 如果未传入 video_id，则新增视频并生成唯一 ID
        course_id = data.get('courseid')
        if not course_id:
            return jsonify({"message": "Course ID is required for a new video"}), 400

        # 检查课程是否存在
        course = Course.query.get(course_id)
        if not course:
            return jsonify({"message": f"Course with ID {course_id} does not exist"}), 404

        new_video_id = str(uuid.uuid4())  # 使用 UUID 生成唯一 ID
        new_video = Video(
            videoid=new_video_id,
            courseid=course_id,
            status=data.get('status', 'pending'),  # 默认状态为 pending
            url=data.get('url', ''),
            video_title=data.get('video_title', '')
        )
        db.session.add(new_video)
        db.session.commit()
        return jsonify({"message": "Video added successfully", "videoid": new_video_id}), 201


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
