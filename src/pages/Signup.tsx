import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Address } from "../components/Address";
import { SSubButton } from "../components/SSignUpBtns";
import { ErrorField } from "../components/styled/ErrorField";
import { Field } from "../components/styled/Field";

const STel = styled.div`
  & > span {
    color: ${(props) => props.theme.secondary};
    font-size: 1rem;
    display: inline-block;
    margin-left: 0.5em;
  }
`;

const STelConcent = styled.div`
  margin-bottom: 1em;

  & > label {
    color: ${(props) => props.theme.primarys};
    margin-right: 1em;
  }
`;

const SBirth = styled.div`
  & > label:not(& > label:nth-of-type(1)) {
    color: ${(props) => props.theme.primarys};
    width: unset;
    margin-right: 1em;
  }
`;

const SHeader = styled.h3`
  margin-top: 3.5em;
  font-size: 2rem;
  font-weight: 700;
`;

const SEmailConcent = styled.div`
  & label {
    display: inline-block;
    color: ${(props) => props.theme.primarys};
    margin-right: 1em;
    /* width: 70px; */
  }
`;

const SSex = styled.div`
  margin: 1em 0;

  & > h4 {
    margin: 1em 0 0.5em;
  }
  & > label {
    display: inline-block;
    color: ${(props) => props.theme.primarys};
  }
`;

const SSignUpInp = styled.input`
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.grey};
  padding: 1em 2em;
  border-radius: 9999px;
  margin-top: 2em;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

const SSignUp = styled.form`
  margin: 4em 0;
  padding: 2em;
  border-radius: 9px;
  background-color: ${(props) => props.theme.grey};

  & p {
    color: ${(props) => props.theme.notice};
    font-size: 1rem;
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  & > div {
    /* padding: 0.3em 0; */
    margin-top: 0.5em;
  }

  & > div > label {
    display: inline-block;
    width: 140px;
  }
`;

interface signupProps {}
export const Signup: React.FC<signupProps> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (e: any) => {
    clearErrors();
    console.log("valid !!!");
    console.log("e ", e);
    if (getValues("password") !== getValues("rpassword")) {
      setError(
        "password",
        { message: "??????????????? ???????????? ????????????." },
        { shouldFocus: true }
      );
      setError("rpassword", { message: "??????????????? ???????????? ????????????." });
    }
  };
  const onabort = (e: any) => {
    console.log("abort !!!");
    console.log("e ", e);
  };
  const clickUniqueName = () => {
    console.log("check if id is duplicated. ");
    const unique = false;
    if (unique) {
      //??????
    } else {
      console.log("?????? ???????????? ?????????");
      setError(
        "id",
        {
          type: "value",
          message: "?????? ???????????? ????????? ?????????.",
        },
        { shouldFocus: true }
      );
    }
  };

  return (
    <>
      <SHeader>????????????</SHeader>
      <SSignUp onSubmit={handleSubmit(onValid, onabort)}>
        <div>
          <label htmlFor='signup-id'>?????????</label>
          <Field
            errors={errors}
            name='id'
            id='signup-id'
            type='text'
            valid={{
              ...register("id", {
                required: "???????????? ??????????????????.",
                minLength: 4,
              }),
            }}
          />
          <SSubButton type='button' onClick={clickUniqueName}>
            ????????????
          </SSubButton>
        </div>
        {errors && errors["id"] && (
          <ErrorField message={errors["id"].message} />
        )}

        <div>
          <label htmlFor='signup-name'>??????</label>
          <Field
            id='signup-name'
            type='text'
            valid={{
              ...register("name", {
                required: "????????? ??????????????????.",
                minLength: 1,
                maxLength: 26,
              }),
            }}
            errors={errors}
            name='name'
          />
        </div>
        {errors && errors["name"] && (
          <ErrorField message={errors["name"].message} />
        )}

        <div>
          <label htmlFor='signup-email-head'>?????????</label>
          <Field
            id='signup-email-head'
            type='text'
            valid={{
              ...register("email-head", {
                required: "???????????? ??????????????????.",
              }),
            }}
            errors={errors}
            name='email-head'
          />
          @
          <Field
            valid={{
              ...register("email-tail", {
                required: "???????????? ?????? ?????? ?????? ????????????.",
              }),
            }}
            type='text'
            errors={errors}
            name='email-tail'
          />
          <select
            {...register("email-tail-select", {
              required: "???????????? ?????? ?????? ?????? ????????????.",
            })}
            onChange={(e) => {
              setValue("email-tail", e.target.value);
            }}
          >
            <option defaultValue=''>????????????</option>
            <option value='naver.com'>naver.com</option>
            <option value='daum.net'>daum.net</option>
            <option value='gmail.com'>gmail.com</option>
            <option value='outlook.com'>outlook.com</option>
          </select>
          <p>
            ????????? ???????????? ???, ?????????/????????????/????????? ?????? ????????? ???????????? ???
            ????????????. ???????????? ?????? ????????? ???????????????(???????????? ??????)???
            ???????????????
          </p>
          <SEmailConcent>
            <input
              type='radio'
              id='signup-email-agree'
              defaultChecked={true}
              {...register("email-consent", { required: "should be checked" })}
            />
            <label htmlFor='signup-email-agree'>???</label>
            <input
              type='radio'
              id='signup-email-disagree'
              {...register("email-consent", { required: "should be checked" })}
            />
            <label htmlFor='signup-email-disagree'>?????????</label>
          </SEmailConcent>
        </div>
        {errors && (errors["email-head"] || errors["email-tail"]) && (
          <ErrorField message={"???????????? ??????????????????."} />
        )}

        <SSex>
          <h4>??????</h4>
          <input
            id='signup-man'
            value='man'
            type='radio'
            {...register("sex")}
          />
          <label htmlFor='signup-man'>??????</label>
          <input
            id='signup-woman'
            value='woman'
            type='radio'
            {...register("sex")}
          />
          <label htmlFor='signup-woman'>??????</label>
          <input
            id='signup-other'
            value='other'
            type='radio'
            defaultChecked={true}
            {...register("sex")}
          />
          <label htmlFor='signup-other'>??? ???</label>
        </SSex>

        <div>
          <label htmlFor='signup-pw'>????????????</label>
          <Field
            id='signup-pw'
            valid={{
              ...register("password", {
                required: "??????????????? ??????????????????.",
                minLength: 4,
                maxLength: 20,
              }),
            }}
            type='password'
            errors={errors}
            name='password'
          />
        </div>
        {errors && errors["password"] && (
          <ErrorField message={errors["password"].message} />
        )}

        <div>
          <label htmlFor='signup-rpw'>???????????? ??????</label>
          <Field
            id='signup-rpw'
            type='password'
            name='rpassword'
            errors={errors}
            valid={{
              ...register("rpassword", {
                required: "????????? ?????? ??????????????? ?????? ??????????????????.",
                minLength: 4,
                maxLength: 20,
              }),
            }}
          />
        </div>
        {errors && errors["rpassword"] && (
          <ErrorField message={errors["rpassword"].message} />
        )}

        <SBirth>
          <label htmlFor='signup-birth'>????????????</label>
          <Field
            id='signup-birth'
            valid={{
              ...register("birth", {
                required: true,
              }),
            }}
            type='date'
            errors={errors}
            name='birth'
          />
          {errors && errors["birth"] && (
            <ErrorField message={errors["birth"].message} />
          )}
          <input
            id='signup-birth-solar'
            {...register("birth-calendar", {
              required: true,
            })}
            type='radio'
            defaultChecked={true}
          />
          <label htmlFor='signup-birth-solar'>??????</label>
          <input
            id='signup-birth-lunar'
            {...register("birth-calendar", {
              required: true,
            })}
            type='radio'
          />
          <label htmlFor='signup-birth-lunar'>??????</label>
        </SBirth>

        <STel>
          <label htmlFor='signup-mobile'>????????????</label>
          <Field
            id='signup-mobile'
            placeholder='???) 01012345678'
            valid={{
              ...register("mobile", {
                required: true,
              }),
            }}
            type='tel'
            pattern='[0]{1}[1]{1}[0]{1}[0-9]{4}[0-9]{4}'
            errors={errors}
            name='mobile'
          />
          {errors && errors["mobile"] && (
            <ErrorField message={errors["mobile"].message} />
          )}

          <span>??????????????? - ?????? ??????????????????</span>
          <STelConcent>
            <p>
              ??????????????? ????????? ?????? ?????? ????????? SMS??? ????????? ??? ????????????.
              ???????????? ?????? ????????? ?????????????????? ???????????????.
            </p>
            <input
              type='radio'
              id='signup-mobile-agree'
              defaultChecked={true}
              {...register("mobile-consent", { required: true })}
            />
            <label htmlFor='signup-mobile-agree'>???</label>
            <input
              type='radio'
              id='signup-mobile-disagree'
              {...register("mobile-consent", { required: true })}
            />
            <label htmlFor='signup-mobile-disagree'>?????????</label>
          </STelConcent>
        </STel>

        <Address
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <SSignUpInp type='submit' value='???????????? ??????' />
      </SSignUp>
    </>
  );
};
