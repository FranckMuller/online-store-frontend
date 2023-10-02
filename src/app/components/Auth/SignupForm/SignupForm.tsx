"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as Api from "@/api";
import type { ISignupData } from "@/interfaces/auth.interface";

import styles from "./SignupForm.module.scss";

const initialData = {
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const SignupForm = () => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);
  const {
    mutate: signup,
    data: authData,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (signupData: ISignupData) => Api.auth.signup(signupData),
    onSuccess: (data) => console.log(data),
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      }
    },
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(data);
  };

  useEffect(() => {
    setData(initialData);
  }, [isSuccess]);

  return (
    <div className={styles["signup-form"]}>
      <h3 className={styles["heading"]}>Registration</h3>
      <form className={styles["form"]} onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={data.username}
            placeholder="Enter your username"
            onChange={onChangeInput}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={data.email}
            placeholder="Enter your email"
            onChange={onChangeInput}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={onChangeInput}
            type="password"
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="repeatedPassword">Repeat password:</label>
          <input
            id="repeatedPassword"
            name="repeatedPassword"
            value={data.repeatedPassword}
            placeholder="Repeat your password"
            onChange={onChangeInput}
            type="password"
          />
        </div>

        <div className={styles["error-button-wrap"]}>
          <span className={styles["error"]}>{error && error}</span>
          <div className={styles["button-wrap"]}>
            <button className={styles["submit-button"]}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
