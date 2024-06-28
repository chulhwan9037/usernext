"use client"
import React, { useState, useEffect } from 'react';
import styles from './AgreeWith.module.css'; // CSS 모듈 import
import axios from 'axios';
import { useRouter } from 'next/navigation';

function AgreeWith() {

  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const allBtnEvent = () => {
    const newState = !allCheck;
    setAllCheck(newState);
    setAgeCheck(newState);
    setUseCheck(newState);
    setMarketingCheck(newState);
  };

  const ageBtnEvent = () => {
    setAgeCheck(!ageCheck);
  };

  const useBtnEvent = () => {
    setUseCheck(!useCheck);
  };

  const marketingBtnEvent = () => {
    setMarketingCheck(!marketingCheck);
  };

  useEffect(() => {
    if (ageCheck && useCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck]);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ageCheck || !useCheck) {
      alert("필수 항목에 동의해 주세요.");
      return;
    }
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post('/api/joinUser', formData);
      alert("회원가입 성공");
      router.push("/login");
      console.log('데이터 저장 성공:', response.data);
    } catch (error) {
      console.error('데이터 저장 오류:', error);
    }
    console.log(formData);
  };

  return (
    <form method="post" action="" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <label className={styles.title}>
          회원가입
        </label>
        <div className={styles.inputContainer}>
          <label htmlFor="id" className={styles.label}>아이디</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className={styles.input} required />
          <label htmlFor="name" className={styles.label}>이름</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
          <label htmlFor="password" className={styles.label}>비밀번호</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
          <label htmlFor="confirmPassword" className={styles.label}>비밀번호 확인</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={styles.input} required />
          {!passwordMatch && <span className={styles.error}>비밀번호가 일치하지 않습니다.</span>}
          <label htmlFor="email" className={styles.label}>이메일</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.checkboxContainer}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
            <label htmlFor="all-check">전체동의</label>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" id="check1" checked={ageCheck} onChange={ageBtnEvent} />
            <label htmlFor="check1">만 14세 이상입니다 <span className={styles.required}>(필수)</span></label>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" id="check2" checked={useCheck} onChange={useBtnEvent} />
            <label htmlFor="check2">이용약관 <span className={styles.required}>(필수)</span></label>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" id="check3" checked={marketingCheck} onChange={marketingBtnEvent} />
            <label htmlFor="check3">마케팅 동의 <span className={styles.optional}>(선택)</span></label>
          </div>
        </div>
      </div>
      <button type="submit" className={ageCheck && useCheck && passwordMatch ? styles.submitButton : styles.submitButtonDisabled}>
        회원가입하기
      </button>
    </form>
  );
}

export default AgreeWith;
