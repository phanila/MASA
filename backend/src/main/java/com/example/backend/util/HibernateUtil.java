//package com.example.backend.util;
//
//import org.hibernate.HibernateException;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
//import org.hibernate.Session;
//
//public class HibernateUtil {
//
//    private static SessionFactory sessionFactory;
//
//    static {
//        try {
//            // Create session factory from hibernate.cfg.xml
//            sessionFactory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(com.example.backend.model.User.class).buildSessionFactory();
//        } catch (Exception e) {
//            e.printStackTrace();
//        } catch (HibernateException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    public static Session getSession() {
//        return sessionFactory.getCurrentSession();
//    }
//
//    public static void shutdown() {
//        sessionFactory.close();
//    }
//}
