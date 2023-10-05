"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import * as Api from "@/api";
import type { ISigninData } from "@/interfaces/auth.interface";

import styles from "./SigninForm.module.scss";

const initialData = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);
  const {
    mutate: signin,
    data: authData,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (signinData: ISigninData) => Api.auth.signin(signinData),
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
    signin(data);
  };

  console.log(isSuccess);

  useEffect(() => {
  if(isSuccess) {
    setData(initialData);
    redirect("/dashboard");
  }
  }, [isSuccess]);

  return (
    <div className={styles["signin-form"]}>
      <h3 className={styles["heading"]}>Login</h3>
      <form className={styles["form"]} onSubmit={onSubmit}>
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

export default SigninForm;
