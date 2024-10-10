import { Dispatch, SetStateAction } from "react";
import { login, logout, signup } from "../auth";
import { NavigateFunction } from "react-router-dom";

export const handleSubmitSignUp = async (
  e: React.FormEvent,
  name: string,
  email: string,
  password: string,
  setName: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  if (!name || !email || !password) {
    setError("All fields are required.");
    return;
  }
  try {
    await signup(email, password, name);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    navigate("/characters");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters.");
      } else if (error.message.includes("auth/email-already-in-use")) {
        setError("Email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } else {
      throw error;
    }
  }
};

export const handleSubmitLogin = async (
  e: React.FormEvent,
  email: string,
  password: string,
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Both fields are required.");
    return;
  }
  try {
    await login(email, password);
    setError("");
    setEmail("");
    setPassword("");
    navigate("/characters");
  } catch (error) {
    if (error) {
      setError("Netacni kredencijali!");
    }
  }
};

export const handleLogout = (setAuthenticated:Dispatch<SetStateAction<boolean>>,navigate: NavigateFunction) => {
  logout();
  setAuthenticated(false);
  navigate("/");
};

export const handleScroll = (
  fetchNextPage: any,
  hasNextPage: boolean,
  isLoading: boolean
): any => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if user has scrolled to the bottom
  if (
    scrollY + windowHeight >= documentHeight - 50 &&
    hasNextPage &&
    !isLoading
  ) {
    fetchNextPage();
  }
};

export const getNumbersFromEndOfURL = (array: (string | null)[]): number[] => {
  const residentIds = array
    ?.map((url) => {
      const match = url?.match(/(\d+)$/);
      return match ? match[1] : null;
    })
    .filter((id): id is string => id !== null);
  const convertedIntoNumberArray = residentIds?.map((a) => {
    return Number(a);
  });
  return convertedIntoNumberArray;
};

export const formatDate = (date: string) => {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedTime = dateTime.toISOString().slice(11, 16);
  return `${formattedDate} ${formattedTime}`;
};
