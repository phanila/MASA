//package com.example.backend.service;
//
//import com.example.backend.model.User;
//import com.example.backend.util.HibernateUtil;
//import org.hibernate.Session;
//import org.hibernate.Transaction;
//
//import java.util.List;
//
//public class UserService {
//
//    public void saveUser(User user) {
//        Session session = HibernateUtil.getSession();
//        Transaction transaction = session.beginTransaction();
//        session.save(user);
//        transaction.commit();
//    }
//
//    public User getUser(Long id) {
//        Session session = HibernateUtil.getSession();
//        Transaction transaction = session.beginTransaction();
//        User user = session.get(User.class, id);
//        transaction.commit();
//        return user;
//    }
//
//    public List<User> getAllUsers() {
//        Session session = HibernateUtil.getSession();
//        Transaction transaction = session.beginTransaction();
//        List<User> users = session.createQuery("from User", User.class).getResultList();
//        transaction.commit();
//        return users;
//    }
//
//    public void updateUser(User user) {
//        Session session = HibernateUtil.getSession();
//        Transaction transaction = session.beginTransaction();
//        session.update(user);
//        transaction.commit();
//    }
//
//    public void deleteUser(Long id) {
//        Session session = HibernateUtil.getSession();
//        Transaction transaction = session.beginTransaction();
//        User user = session.get(User.class, id);
//        if (user != null) {
//            session.delete(user);
//        }
//        transaction.commit();
//    }
//}
