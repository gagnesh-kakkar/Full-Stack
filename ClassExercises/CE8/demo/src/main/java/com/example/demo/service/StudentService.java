package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import java.util.Optional;


@Service
public class StudentService {
    //IOC or Inversion of Control
    private final StudentRepository studentRepository;

    //Constructor Injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    //Read Operation
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    //it wll return true if student is present else false
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    //Create Operation
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    //Update Operation
    public Student updateStudent(Long id, Student updateStudent) {
        return studentRepository.findById(id)
                .map(student-> {
                    student.setName(updateStudent.getName());
                    student.setEmail(updateStudent.getEmail());
                    student.setPassword(updateStudent.getPassword());
                    return studentRepository.save(student);
                }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    //Delete Operation
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}