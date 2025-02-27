import React, { useEffect } from "react";
import { useOutlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCurrentRoute } from "../../hooks/useCurrentRoute";
import Navigation from "../components/Navigation";
import ThumbnailImage from "../../static/images/thumbnail.jpg";
import {
  useCheckIfIdentityCompleteMutation,
  useGetSessionQuery,
} from "../../state/asynchronous/users";
import { useAuth } from "../../hooks/useAuth";

const MasterPage = () => {
  const outlet = useOutlet();
  const { user } = useAuth();

  useGetSessionQuery();
  const [checkIfIdentityComplete] = useCheckIfIdentityCompleteMutation();

  useEffect(() => {
    if (user.id) {
      checkIfIdentityComplete(user.id);
    }
  }, [user, checkIfIdentityComplete]);

  const currentRoute = useCurrentRoute();

  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <title>{currentRoute?.title}</title>
        <meta name="description" content={currentRoute?.description} />
        <meta name="keywords" content="React, Helmet, SEO, Metadata" />
        <meta name="author" content="Your Name or Company" />

        <meta property="og:title" content={currentRoute?.title} />
        <meta property="og:description" content={currentRoute?.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={ThumbnailImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentRoute?.title} />
        <meta name="twitter:description" content={currentRoute?.description} />
        <meta name="twitter:image" content={ThumbnailImage} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Esmana main proof of concept" />
      </Helmet>
      <Navigation>
        <div className="layout">{outlet}</div>
      </Navigation>
    </div>
  );
};

export default React.memo(MasterPage);
