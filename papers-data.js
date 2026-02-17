// Add new papers by duplicating one object in this array and editing fields.
// Template object (copy, paste, then fill fields):
// {
//   slug: "new-paper-slug",
//   title: "Paper title",
//   authors: [
//     { name: "Author One", url: "https://example.com" },
//     { name: "Vishvajeet N" }
//   ],
//   conference: {
//     full: "Conference full name",
//     short: "CONF",
//     year: "2026",
//     url: "https://conference-website.example",
//     location: "City, Country"
//   },
//   abstractParagraphs: [
//     "Paragraph 1...",
//     "Paragraph 2..."
//   ],
//   resources: {
//     conferenceVersionPdf: "paper.pdf",
//     fullVersionPdf: "https://arxiv.org/abs/...",
//     talkSlidesPdf: "slides.pdf",
//     talkVideo: "https://youtube.com/..."
//   }
// },
window.PAPERS = [
  {
    slug: "volume-matching",
    title: "Deterministic Approximation for the Volume of the Truncated Fractional Matching Polytope",
    authors: [
      { name: "Heng Guo", url: "https://homepages.inf.ed.ac.uk/hguo/" },
      { name: "Vishvajeet N" }
    ],
    conference: {
      full: "Innovations in Theoretical Computer Science",
      short: "ITCS",
      year: "2025",
      url: "http://itcs-conf.org",
      location: "Columbia University, USA"
    },
    abstractParagraphs: [
      "We give a deterministic polynomial-time approximation scheme (FPTAS) for the volume of the truncated fractional matching polytope for graphs of maximum degree \\(\\Delta\\), where the truncation is by restricting each variable to the interval \\([0, (1 + \\delta)/\\Delta]\\), and \\(\\delta \\le C/\\Delta\\) for some constant \\(C > 0\\).",
      "We also generalise our result to the fractional matching polytope for hypergraphs of maximum degree \\(\\Delta\\) and maximum hyperedge size \\(k\\), truncated by \\([0, (1 + \\delta)/\\Delta]\\) as well, where \\(\\delta \\le C \\cdot \\Delta^{-(2k - 3)/(k - 1)} \\cdot 1/k\\) for some constant \\(C > 0\\). The latter result generalises both the first result for graphs (when \\(k = 2\\)), and a result by Bencs and Regts (2024) for the truncated independence polytope (when \\(\\Delta = 2\\)).",
      "Our approach is based on the cluster expansion technique."
    ],
    resources: {
      fullVersionPdf: "https://arxiv.org/abs/2409.07283v1",
      talkSlidesPdf: "3-volumematching-talk.pdf",
      talkVideo: "https://www.youtube.com/watch?v=w2cT3pyVM6k&pp=4AQB"
    }
  },
  {
    slug: "extracting-mergers",
    title: "Extracting Mergers and Projections of Partitions",
    authors: [
      { name: "Swastik Kopparty", url: "https://www.math.toronto.edu/swastik/" },
      { name: "Vishvajeet N" }
    ],
    conference: {
      full: "International Conference on Randomness and Computation",
      short: "RANDOM",
      year: "2023",
      url: "https://randomconference.com/random-2023-home/",
      location: "Georgia Institute of Technology, USA"
    },
    abstractParagraphs: [
      "We study the problem of extracting randomness from somewhere-random sources, and related combinatorial phenomena: partition analogues of Shearer's lemma on projections.",
      "A somewhere-random source is a tuple \\((X_1, \\ldots, X_t)\\) of (possibly correlated) \\(\\{0,1\\}^n\\)-valued random variables \\(X_i\\) where for some unknown \\(i \\in [t]\\), \\(X_i\\) is guaranteed to be uniformly distributed. An extracting merger is a seeded device that takes a somewhere-random source as input and outputs nearly uniform random bits. We study the seed-length needed for extracting mergers with constant \\(t\\) and constant error.",
      "Since a somewhere-random source has min-entropy at least n, a standard extractor can also serve as an extracting merger. Our goal is to understand whether the further structure of being somewhere-random rather than just having high entropy enables smaller seed-length, and towards this we show:",
      "Just like in the case of standard extractors, seedless extracting mergers with even just one output bit do not exist.",
      "Unlike the case of standard extractors, it is possible to have extracting mergers that output a constant number of bits using only constant seed. Furthermore, a random choice of merger does not work for this purpose.",
      "Nevertheless, just like in the case of standard extractors, an extracting merger which gets most of the entropy out (namely, having \\(\\Omega(n)\\) output bits) must have \\(\\Omega(\\log n)\\) seed. This is the main technical result of our work, and is proved by a second-moment strengthening of the graph-theoretic approach of Radhakrishnan and Ta-Shma to extractors.",
      "All this is in contrast to the status for condensing mergers (where the output is only required to have high min-entropy), whose seed-length/output-length tradeoffs can all be fully explained by using standard condensers.",
      "Inspired by such considerations, we also formulate a new and basic class of problems in combinatorics: partition analogues of Shearer's lemma. We show basic results in this direction; in particular, we prove that in any partition of the 3-dimensional cube \\([0, 1]^3\\) into two parts, one of the parts has an axis-parallel 2-dimensional projection of area at least \\(3/4\\)."
    ],
    resources: {
      conferenceVersionPdf: "https://drops.dagstuhl.de/opus/volltexte/2023/18877/",
      fullVersionPdf: "https://eccc.weizmann.ac.il/report/2023/092/",
      talkSlidesPdf: "2-extracting-talk.pdf"
    }
  },
  {
    slug: "streaming-xor",
    title: "Graph Streaming Lower Bounds for Parameter Estimation and Property Testing via a Streaming XOR Lemma",
    authors: [
      { name: "Sepehr Assadi", url: "https://sepehr.assadi.info/" },
      { name: "Vishvajeet N" }
    ],
    conference: {
      full: "Symposium on Theory of Computing",
      short: "STOC",
      year: "2021",
      url: "http://acm-stoc.org/stoc2021/",
      location: "Virtual"
    },
    abstractParagraphs: [
      "We study space-pass tradeoffs in graph streaming algorithms for parameter estimation and property testing problems such as estimating the size of maximum matchings and maximum cuts, weight of minimum spanning trees, or testing if a graph is connected or cycle-free versus being far from these properties. We develop a new lower bound technique that proves that for many problems of interest, including all the above, obtaining a \\((1 + \\epsilon)\\)-approximation requires either near-linear space or \\(\\Omega(1/\\epsilon)\\) passes, even on highly restricted families of graphs such as bounded-degree planar graphs. For multiple of these problems, this bound matches those of existing algorithms and is thus (asymptotically) optimal.",
      "Our results considerably strengthen prior lower bounds even for arbitrary graphs: starting from the influential work of [Verbin, Yu; SODA 2011], there has been a plethora of lower bounds for single-pass algorithms for these problems; however, the only multi-pass lower bounds proven very recently in [Assadi, Kol, Saxena, Yu; FOCS 2020] rules out sublinear-space algorithms with exponentially smaller \\(o(\\log(1/\\epsilon))\\) passes for these problems.",
      "One key ingredient of our proofs is a simple streaming XOR Lemma, a generic hardness amplification result, that we prove: informally speaking, if a \\(p\\)-pass \\(s\\)-space streaming algorithm can only solve a decision problem with advantage \\(\\delta > 0\\) over random guessing, then it cannot solve XOR of \\(L\\) independent copies of the problem with advantage much better than \\(\\delta^L\\). This result can be of independent interest and useful for other streaming lower bounds as well."
    ],
    resources: {
      conferenceVersionPdf: "1-stoc21conf.pdf",
      fullVersionPdf: "https://arxiv.org/abs/2104.04908",
      talkVideo: "https://youtu.be/jtP5EMOFxqI"
    }
  }
];
