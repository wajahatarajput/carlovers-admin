// components/BankAccountForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';

interface Country {
  code: string;
  name: string;
}

interface BankAccountFormProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setStripeAccount: React.Dispatch<React.SetStateAction<string>>;
    setAccountLinkUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const BankAccountForm: React.FC<BankAccountFormProps> = ({ 
    setIsOpen,
    setStripeAccount,
    setAccountLinkUrl
}) => {
  const { control, handleSubmit, watch, setValue, register } = useForm({
    defaultValues: {
      bankTitle: '',
      ssn: '',
      bankName: '',
      bankCountry: 'US',
      accountNumber: '',
      routingNumber: ''
    }
  });

  const countryList = [
    { name: "Albania", code: "AL" },
    { name: "Åland Islands", code: "AX" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas ", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia (Plurinational State of)", code: "BO" },
    { name: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory ", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cayman Islands ", code: "KY" },
    { name: "Central African Republic ", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands ", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros ", code: "KM" },
    { name: "Congo (the Democratic Republic of the)", code: "CD" },
    { name: "Congo ", code: "CG" },
    { name: "Cook Islands ", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Curaçao", code: "CW" },
    { name: "Cyprus", code: "CY" },
    { name: "Czechia", code: "CZ" },
    { name: "Côte d'Ivoire", code: "CI" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic ", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands  [Malvinas]", code: "FK" },
    { name: "Faroe Islands ", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories ", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia ", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "GR" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and McDonald Islands", code: "HM" },
    { name: "Holy See ", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran (Islamic Republic of)", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea (the Democratic People's Republic of)", code: "KP" },
    { name: "Korea (the Republic of)", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lao People's Democratic Republic ", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands ", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia (Federated States of)", code: "FM" },
    { name: "Moldova (the Republic of)", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands ", code: "NL" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger ", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands ", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestine, State of", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines ", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Republic of North Macedonia", code: "MK" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation ", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Réunion", code: "RE" },
    { name: "Saint Barthélemy", code: "BL" },
    { name: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Martin (French part)", code: "MF" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Sint Maarten (Dutch part)", code: "SX" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan ", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan (Province of China)", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands ", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    {
      name: "United Kingdom of Great Britain and Northern Ireland",
      code: "GB",
    },
    { name: "United States Minor Outlying Islands ", code: "UM" },
    { name: "United States of America", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela (Bolivarian Republic of)", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands (British)", code: "VG" },
    { name: "Virgin Islands (U.S.)", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];

  const bankCountry = watch('bankCountry');

  const onSubmitHandler = (data: any) => {
    // if (onSubmit) {
    //   onSubmit(data);
    // } else {
    //   toast.error('Submit handler is not defined');
    // }
  };

  return (
    <form className='m-5' onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="d-block d-sm-block d-md-block d-lg-flex">
        <div>
          <h4>Banking Information</h4>
          <hr />
          <div className="mb-3">
            <label className="form-label">
              <small>Title of Bank Account </small>
            </label>
            <Controller
              name="bankTitle"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control rounded"
                //   disabled={disabled}
                  placeholder="Title of Bank Account"
                  required
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <small>SSN Last 4 Digits </small>
            </label>
            <Controller
              name="ssn"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control rounded"
                  id="ssn"
                //   disabled={disabled}
                  maxLength={4}
                  placeholder="7865"
                  required
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <small>Bank Name </small>
            </label>
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control rounded"
                //   disabled={disabled}
                  placeholder="Title of Bank Account"
                  required
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <small>Bank Country </small>
            </label>
            <Controller
              name="bankCountry"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="form-control rounded"
                //   disabled={disabled}
                >
                  {countryList.map((country, index) => (
                    <option value={country.code} key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">
                <small>Account Number / IBAN </small>
              </label>
              <Controller
                name="accountNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    className="form-control rounded"
                    // disabled={disabled}
                    pattern="[0-9\s]{1,34}"
                    maxLength={34}
                    placeholder="Account Number / IBAN"
                    required
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <small>Routing Number </small>
              </label>
              <Controller
                name="routingNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    className="form-control rounded"
                    // disabled={disabled}
                    pattern="[0-9\s]{1,34}"
                    maxLength={9}
                    placeholder="Routing Number"
                    required
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
        //   disabled={disabled}
          className="btn btn-outline-primary rounded border-0 w-100"
        >
            Add Bank Account
          {/* {disabled ? (
            <span className="spinner-border" role="status"></span>
          ) : (
            ''
          )} */}
        </button>
      </div>
    </form>
  );
};