import React from "react";
import BlogCommentForm from "./BlogCommentForm";
import BlogComments from "./BlogComments";

const BlogDetails = () => {
  return (
    <section className="blog-details-area pt-175 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="blog-details-wrap">
              <div className="bd-content-top text-center">
                <div className="blog-meta-two">
                  <ul className="list-wrap">
                    <li className="tag">
                      <a href="#">Sector</a>
                    </li>
                    <li>
                      <i className="fal fa-clock"></i>5 Min
                    </li>
                  </ul>
                </div>
                
                <h2 className="title">
                  How to Post a Classified Ad Online or in Newspapers
                </h2>

                <p>
                  Lorem ipsum dolor sit amet, sed nulla ante amet, elementum
                  tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac
                  scelerisque nibh dolores consectetuer, nulla aptent est pede.
                  Scelerisque euismod varius mi, congue eget sed vestibulum,
                  ornare cras sed nec.
                </p>

                <div className="blog-meta-two bottom">
                  <ul className="list-wrap">
                    <li className="avatar">
                      <a href="blog-details.html">
                        <img src="/img/blog/blog_avatar01.png" alt="" />
                        Victor Pacheco
                      </a>
                    </li>
                    <li>
                      <i className="fal fa-calendar"></i>March 17, 2023
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-details-img">
                <img src="/img/blog/blog_details_img.jpg" alt="" />
              </div>

              <div className="bd-content-bottom">
                <h2 className="title">
                  Pilotage de la performance : vos indicateurs <br />
                  dans le même viseur
                </h2>
                <p>
                  Un tableau de bord est un outil de gestion et d'évaluation de
                  l’organisation d'une entreprise. Il est généralement constitué
                  de plusieurs indicateurs de performance à des moments ou des
                  périodes données. Lepilotage de la performance permet ainsi de
                  comparer différents indicateurs et de les mettre en
                  perspective. Le tableau de bord est donc un outil précieux
                  lorsqu’il s’agit de surveiller ses performances et de
                  planifier ses ressources pour ainsi optimiser sa performance.
                </p>
                <p>
                  Le pilotage de la performance par Skello est une interface
                  développée spécialement pour nos clients. L’objectif ? Obtenir
                  une visibilité globale de la santé de son organisation et de
                  ses établissements. Nous avons conçu cette solution de
                  pilotage grâce à vos indicateurs de performance et les données
                  du planning de nos clients.
                </p>
                <p>
                  Voici le détail des indicateurs que les clients pourront
                  analyser pour optimiser leur gestion et leur planification :
                </p>
                <ul className="list-wrap">
                  <li>
                    <span>Chiffre d’affaires.</span>Il correspond à la somme des
                    ventes de biens ou de services hors taxes réalisés par un
                    établissement dans le cadre d’une activité professionnelle
                    courante.
                  </li>
                  <li>
                    <span>Masse salariale chargée.</span>Cet indicateur
                    correspond à la masse salariale additionnée aux cotisations
                    patronales.
                  </li>
                  <li>
                    <span>Ratio de masse salariale chargée</span>/ CA. Cet
                    indicateur indique le ratio entre le coût de la masse
                    salariale chargée sur le revenu réalisé par l’établissement.
                    Il est possible de le calculer en fonction du prévisionnel
                    et du réalisé.
                  </li>
                  <li>
                    <span>Heures travaillées et heures d’absences.</span>Cet
                    indicateur correspond à la somme des heures travaillées et à
                    la somme des heures d’absences cumulées.
                  </li>
                  <li>
                    <span>Heures travaillées par poste.</span>Ce ratio indique
                    le nombre d’heures travaillées en fonction
                  </li>
                </ul>
                <p>
                  Un tableau de bord est un outil de gestion et d'évaluation de
                  l’organisation d'une entreprise. Il est généralement constitué
                  de plusieurs indicateurs de performance à des moments ou des
                  périodes données. Le pilotage de la performance permet ainsi
                  de comparer différents indicateurs et de les mettre en
                  perspective. Le tableau de bord est donc un outil précieux
                  lorsqu’il s’agit de surveiller ses performances et de
                  planifier ses ressources pour ainsi optimiser sa performance.
                </p>
              </div>
            </div>

            {/* comments */}
            <BlogComments />

            {/* comment form */}
            <BlogCommentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
