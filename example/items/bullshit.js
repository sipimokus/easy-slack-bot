// http://www.dack.com/web/bullshit.html

module.exports = function( bot )
{
    var params = {
        icon_emoji: ':shit:'
    };

    return {
        message: function( message, callBack )
        {
            if ( message.naturals.indexOf("bullshit") > -1 )
            {
                this.answer( callBack );

                return true;
            }

            return false;
        },

        answer : function( callBack )
        {
            var array1 = ["implement", "utilize", "integrate", "streamline", "optimize", "evolve", "transform", "embrace",
                "enable", "orchestrate", "leverage", "reinvent", "aggregate", "architect", "enhance", "incentivize",
                "morph", "empower", "envisioneer", "monetize", "harness", "facilitate", "seize", "disintermediate",
                "synergize", "strategize", "deploy", "brand", "grow", "target", "syndicate", "synthesize", "deliver",
                "mesh", "incubate", "engage", "maximize", "benchmark", "expedite", "reintermediate", "whiteboard",
                "visualize", "repurpose", "innovate", "scale", "unleash", "drive", "extend", "engineer",
                "revolutionize", "generate", "exploit", "transition", "e-enable", "iterate", "cultivate", "matrix",
                "productize", "redefine", "recontextualize"];

            var array2 = ["clicks-and-mortar", "value-added", "vertical", "proactive", "robust", "rich",
                "revolutionary", "scalable", "leading-edge", "innovative", "intuitive", "strategic", "e-business",
                "mission-critical", "sticky", "one-to-one", "24/7", "end-to-end", "global", "B2B", "B2C", "granular",
                "frictionless", "virtual", "viral", "dynamic", "24/365", "best-of-breed", "killer", "magnetic",
                "bleeding-edge", "web-enabled", "interactive", "dot-com", "sexy", "back-end", "real-time", "efficient",
                "front-end", "distributed", "seamless", "extensible", "turn-key", "world-class", "open-source",
                "cross-platform", "cross-media", "synergistic", "bricks-and-clicks", "out-of-the-box", "enterprise",
                "integrated", "impactful", "wireless", "transparent", "next-generation", "cutting-edge", "user-centric",
                "visionary", "customized", "ubiquitous", "plug-and-play", "collaborative", "compelling", "holistic"];

            var array3 = ["synergies", "web-readiness", "paradigms", "markets", "partnerships", "web services", "methodologies",
                "infrastructures", "platforms", "initiatives", "channels", "eyeballs", "communities", "ROI",
                "solutions", "e-tailers", "e-services", "action-items", "portals", "niches", "technologies", "content",
                "vortals", "supply-chains", "convergence", "relationships", "architectures", "interfaces", "e-markets",
                "e-commerce", "systems", "bandwidth", "infomediaries", "models", "mindshare", "deliverables", "users",
                "schemas", "networks", "applications", "metrics", "e-business", "functionalities", "experiences"];

            var index1 = Math.round(Math.random() * array1.length - 1);
            var index2 = Math.round(Math.random() * array2.length - 1);
            var index3 = Math.round(Math.random() * array3.length - 1);

            var text = array1[index1] + " " + array2[index2] + " " + array3[index3] + ".";

            callBack( text, params, undefined );
        }
    };
};
