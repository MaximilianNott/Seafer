const REPRESENTATIVE_OFFICE_FLAGS = {
  RO_ESTABLISHMENT_LICENCE: {
    meaning:
      "Representative Office establishment licence required",

    explanation:
      "A foreign trader establishing a Representative Office in Vietnam must obtain a Representative Office establishment licence before commencing its permitted activities.",

    authority:
      "Provincial Department of Industry and Trade or other competent licensing authority",

    legalBasis:
      "Law on Commerce 2005; Decree 07/2016/ND-CP",

    impact:
      "The Representative Office cannot lawfully commence its permitted activities without the required establishment licence.",

    riskWeight: 0,

    category: "corporate",

    priority: "baseline",

    applies: (input) => {
      return input.entityType === "representative_office";
    },

    nextSteps: [
      {
        requirement:
          "Prepare the Representative Office establishment licence application dossier",
      },
      {
    requirement:
      "Verify that the foreign parent company has been established or registered for at least one year before applying."
      },
      {
        requirement:
          "Submit the application to the competent licensing authority",
      },
    ],
  },

RO_TAX_PAYROLL_COMPLIANCE: {
  meaning: "Representative Office tax and payroll compliance obligations",

  explanation:
    "A Representative Office must comply with applicable Vietnamese tax and employee-related financial obligations, including obligations arising from its personnel and local operations, even though the Representative Office is not intended to conduct direct revenue-generating commercial activities.",

  authority:
    "Vietnamese tax and social insurance authorities",

  legalBasis:
    "Decree 07/2016/ND-CP and applicable Vietnamese tax and social insurance regulations",

  impact:
    "Failure to meet applicable tax, payroll or employee-related obligations may result in regulatory non-compliance, penalties or additional liabilities.",

  riskWeight: 10,

  category: "tax",

  priority: "baseline",

  type: "baseline",

  applies: (input) => {
    return input.entityType === "representative_office";
  },

  nextSteps: [
    {
      requirement:
        "Confirm applicable personal income tax, payroll and social insurance obligations for Representative Office personnel."
    },
    {
      requirement:
        "Maintain appropriate records and complete applicable tax and employee-related filings."
    }
  ]
},

RO_PARENT_ESTABLISHMENT_PERIOD: {
  meaning: "Parent company establishment period requirement not satisfied",

  explanation:
    "The foreign parent company must generally have been established or registered and operated for at least one year before applying to establish a Representative Office in Vietnam.",

  authority:
    "Provincial Department of Industry and Trade (DOIT)",

  legalBasis:
    "Decree 07/2016/ND-CP, Article 7",

  impact:
    "The Representative Office may not satisfy the applicable establishment eligibility requirements.",

  riskWeight: 70,

  category: "corporate",

  priority: "high",

  applies: (input) => {
    return (
      input.entityType === "representative_office" &&
      input.parentCompanyEstablishedPeriod === "less_than_1_year"
    );
  },

  nextSteps: [
    {
      requirement:
        "Verify that the foreign parent company satisfies the applicable minimum establishment or operation period before applying for the Representative Office licence."
    }
  ]
},

RO_COMMERCIAL_ACTIVITY_PROHIBITION: {
    meaning: "Direct profit-generating or commercial activity prohibited",
    explanation: "A Representative Office cannot engage in direct revenue-generating activities, execute commercial contracts independently, issue commercial invoices, or receive trade funds locally.",
    authority: "Provincial Department of Industry and Trade (DOIT) and General Department of Taxation (GDT)",
    legalBasis: "Law on Commerce 2005, Article 18; Decree 07/2016/ND-CP, Article 30",
    impact: "Conducting activities outside the permitted scope of a Representative Office may result in regulatory non-compliance and enforcement action.",
    riskWeight: 5,
    category: "corporate",
    priority: "baseline",
    applies: (input) => {
  return input.entityType === "representative_office";
    },
    nextSteps: [
  {
    requirement: "Ensure the Representative Office operates only within permitted representative functions and does not conduct revenue-generating business activities."
  },
  {
    requirement: "Ensure commercial contracting, invoicing, and trade execution are conducted through the foreign parent company where required."
  },
    ],
  },

  RO_CHIEF_REP_DUAL_ROLE_RESTRICTION: {
    meaning: "Chief Representative dual leadership restriction",
    explanation: "The Chief Representative of a Vietnam RO cannot concurrently hold the position of Head of a Branch of any foreign trader, or act as the legal representative or Director of an economic organization incorporated under Vietnamese law.",
    authority: "Provincial Department of Industry and Trade (DOIT)",
    legalBasis: "Decree 07/2016/ND-CP, Article 33",
    impact: "Failure to satisfy applicable Chief Representative requirements may affect the establishment or continued compliance of the Representative Office.",
    riskWeight: 4,
    category: "documentation",
    priority: "baseline",
    applies: (input) => {
  return input.entityType === "representative_office";
},
    nextSteps: [
  {
    requirement: "Verify that the proposed Chief Representative does not hold a conflicting position prohibited under the applicable RO rules."
  }
],
  },

  RO_OFFICE_LOCATION_COMPLIANCE: {
    meaning: "Representative Office premises require location compliance verification",
    explanation: "The proposed Representative Office premises must satisfy applicable requirements for security, safety, health, land use and other conditions applying to the premises.",
    authority: "Department of Industry and Trade & Local Police Authorities",
    legalBasis: "Decree 07/2016/ND-CP; Law on Housing 2014, Article 6",
    impact: "Inability to register the address, licensing rejection, or eviction during sudden local municipal inspection sweeps.",
    riskWeight: 3,
    category: "operational",
    priority: "baseline",
    applies: (input) => {
  return (
    input.entityType === "representative_office" &&
    input.locationType === "residential_apartment"
  );
},
    nextSteps: [
  {
    requirement:
      "Verify that the proposed premises may lawfully be used as a Representative Office.",
  },
  {
    requirement:
      "Confirm that the premises satisfy applicable land use, building, security, safety and other location requirements.",
  },
],
},

RO_NAMEPLATE_DISPLAY_OBLIGATION: {
    meaning: "Mandatory corporate nameplate display at physical premises",
    explanation: "The RO must visibly and publically display its full official nameplate at the entrance of its registered physical location. The name must include the words 'Representative Office' in Vietnamese.",
    authority: "Provincial Department of Industry and Trade (DOIT) & Market Surveillance Agency",
    legalBasis: "Decree 07/2016/ND-CP; Decree 28/2017/ND-CP",
    impact: "Administrative warnings or monetary fines during localized market surveillance or police compliance checks.",
    riskWeight: 1,
    category: "operational",
    priority: "baseline",
    applies: (input) => {
  return input.entityType === "representative_office";
},
    nextSteps: [
  {
    requirement: "Ensure the Representative Office displays the required nameplate at its registered premises."
  }
]
  },

RO_DIRECT_REVENUE_GENERATION: {
  meaning:
    "Direct revenue-generating activity is incompatible with the proposed Representative Office structure",

  explanation:
    "A Representative Office is intended to perform permitted representative functions and should not conduct direct revenue-generating commercial activities in Vietnam.",

  authority:
    "Provincial Department of Industry and Trade (DOIT)",

  legalBasis:
    "Law on Commerce 2005; Decree 07/2016/ND-CP",

  impact:
    "The proposed activity may be incompatible with the Representative Office structure and may require a different commercial or investment structure.",

  riskWeight: 85,

  category: "corporate",

  priority: "prohibited",

  type: "prohibited",

  applies: (input) => {
    return (
      input.entityType === "representative_office" &&
      input.intendsRevenue === true
    );
  },

  nextSteps: [
    {
      requirement:
        "Review whether a Vietnamese company, branch, or other permitted commercial structure is required for the proposed revenue-generating activity."
    },
    {
      requirement:
        "Ensure the Representative Office does not conduct direct revenue-generating commercial activities."
    }
  ]
},

  RO_ANNUAL_ACTIVITY_REPORT: {
    meaning:
      "Annual Representative Office activity report",

    explanation:
      "A Representative Office must submit an annual report on its activities during the preceding year to the competent authority.",

    authority:
      "Competent licensing authority",

    legalBasis:
      "Decree 07/2016/ND-CP",

    impact:
      "Failure to submit the required annual activity report may result in non-compliance with Representative Office reporting obligations.",

    riskWeight: 0,

    category: "reporting",

    priority: "baseline",

    applies: (input) => {
      return input.entityType === "representative_office";
    },

    nextSteps: [
      {
        requirement:
          "Prepare the annual Representative Office activity report",
      },
      {
        requirement:
          "Submit the annual activity report before the applicable deadline",
      },
    ],
  },
};

module.exports = {
  REPRESENTATIVE_OFFICE_FLAGS,
};