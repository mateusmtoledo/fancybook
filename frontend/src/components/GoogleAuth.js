import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

function GoogleAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    localStorage.setItem('token', token);
    navigate('/');
  });

  return (
    <Loading />
  );
}

export default GoogleAuth;
