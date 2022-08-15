import { useRouter } from 'next/router'
import Head from "next/head";
import { FcMenu } from "react-icons/fc";
import { BsMoon, BsSearch } from "react-icons/bs";
import { VscBell } from "react-icons/vsc";
import { MdArrowForwardIos, MdInsertChartOutlined, MdOpacity, MdOutlineSpaceDashboard, MdWeb } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import { GiPlainCircle } from "react-icons/gi";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { IconType } from "react-icons";
import Link from "next/link";

type ISubMenuItem = {
  slug: string;
  description: string;
  href: string;
}

type IMenuItem = {
  icon: IconType;
  slug: string;
  description: string;
  href: string;
}

type IDropdownMenuItem = {
  icon: IconType;
  slug: string;
  description: string;
  dropdown: ISubMenuItem[]
}


const MenuItem: React.FC<IMenuItem> = ({ icon, slug, description, href }) => {
  const router = useRouter()
  const { page } = router.query

  let baseClass = "select-none cursor-pointer flex flex-row w-full items-center justify-start px-8 py-3";
  baseClass = page === slug
    ? baseClass + " text-blue-900 bg-white bg-white rounded-br-[20px] rounded-tr-[20px] font-bold"
    : baseClass + " hover:bg-white hover:rounded-br-[20px] hover:rounded-tr-[20px]";

  return (
    <Link href={ href }>
      <span className={ baseClass }>
        { React.createElement(icon, { className: "text-[18px] shrink-0" }) }
        <div className="px-1.5" />
        <span className="text-[13px]">{ description }</span>
      </span>
    </Link>
  );
}

const DropdownMenuItem: React.FC<IDropdownMenuItem> = ({ icon, slug, description, dropdown = [] }) => {
  const router = useRouter();
  const { page } = router.query;
  const [isFolded, setIsFolded] = useState(true);
  const isSelected = (dropdown.filter(e => e.slug === page).length > 0);
  useEffect(() => {
    if (!isSelected) {
      setIsFolded(true)
    } else {
      setIsFolded(false)
    }
  }, [router.query.page])
  let baseClass = "select-none cursor-pointer flex flex-row w-full items-center justify-start px-8 py-3";
  baseClass += !isFolded || isSelected
    ? " text-blue-900 bg-white bg-white rounded-tr-[20px]"
    : " hover:bg-white hover:rounded-br-[20px] hover:rounded-tr-[20px]";
  baseClass += isSelected ? " font-bold" : "";
  baseClass += isSelected && isFolded ? " rounded-br-[20px]" : "";
  let arrowClass = "text-gray-400 text-[10px] ml-auto";
  arrowClass += !isFolded ? " rotate-90" : "";

  let drop = <></>;
  if (!isFolded) {
    drop = <>
      {
        dropdown.map(({ slug, href, description }, index) => {
          const isLast = dropdown.length === index + 1;
          let baseClass = "select-none cursor-pointer flex flex-row w-full items-center justify-start px-8 py-3 bg-white"
          baseClass += isLast ? " rounded-br-[20px]" : "";
          baseClass += page === slug ? " text-blue-900 font-bold" : "";

          return (
            <Link href={ href } key={ index }>
              <span className={ baseClass }>
                <GiPlainCircle className="text-[6px] text-gray-300" />
                <div className="px-1.5" />
                <span className="text-[12px]">{ description }</span>
              </span>
            </Link>
          );
        })
      }
    </>
  }

  return (
    <>
      <span className={ baseClass } onClick={ () => setIsFolded(!isFolded) }>
          { React.createElement(icon, { className: "text-[18px] shrink-0" }) }
        <div className="px-1.5" />
          <span className="text-[13px]">{ description }</span>
          <MdArrowForwardIos className={ arrowClass } />
      </span>
      { drop }
    </>
  );
}

const Admin = () => {
  return (
    <>
      <Head>
        <title>Zen Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row">
        <nav className="w-[300px] flex flex-row items-center justify-start px-8">
          <FcMenu className="text-2xl cursor-pointer" />
          <div className="p-1"></div>
          <div className="text-2xl capitalize font-bold">Zen<span
            className="text-black font-bold cursor-pointer text-blue-900">Admin</span></div>
        </nav>
        <nav className="flex flex-row items-center pb-3 pt-4 pr-9 pl-12 justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-gray-400 text-3xl mb-2.5">Icons with really big descriptions</h1>
            <h3 className="text-gray-400 text-base">Meio de pagamento</h3>
          </div>
          <div className="flex flex-row items-center">
            <BsSearch className="text-xl cursor-pointer" />
            <div className="p-2.5"></div>
            <BsMoon className="text-xl cursor-pointer" />
            <div className="p-2.5"></div>
            <div className="relative cursor-pointer">
              <VscBell className="text-2xl" />
              <div className="bg-orange-500 rounded-full w-2 h-2 absolute top-[-2px] left-[45%]" />
            </div>
            <div className="p-2.5"></div>
            <div
              className="bg-blue-900 text-white rounded-full w-8 h-8 text-center leading-8 font-bold cursor-pointer">B
            </div>
          </div>
        </nav>
      </div>
      <div className="flex flex-row text-gray-600">
        <nav className="w-[300px] flex flex-col items-center justify-start">
          <MenuItem
            icon={ props => <MdOutlineSpaceDashboard { ...props } className="text-[22px] shrink-0" /> }
            description='Dashboard'
            href='/dashboard'
            slug='dashboard'
          />
          <div className="text-gray-900 text-[11px] uppercase font-bold self-start px-8 pb-2 pt-6 w-full">UI Elements
          </div>
          <MenuItem
            icon={ props => <SiDatabricks { ...props } /> }
            description='UI Elements'
            href='/ui-elements'
            slug='ui-elements'
          />
          <div className="p-[1px]"></div>
          <MenuItem
            icon={ props => <MdOpacity { ...props } /> }
            description='Charts'
            href='/charts'
            slug='charts'
          />
          <div className="p-[1px]"></div>
          <DropdownMenuItem
            icon={ props => <MdWeb { ...props } /> }
            description='Form Elements'
            slug='form-elements'
            dropdown={ [
              {
                description: 'Meio de pagamento',
                href: '/payment-method',
                slug: 'payment-method',
              },
              {
                description: 'Meio de pagamento 2',
                href: '/payment-method2',
                slug: 'payment-method2',
              }
            ] }
          />
          <div className="text-gray-900 text-[11px] uppercase font-bold self-start px-8 pb-2 pt-6 w-full">Form and
            Datas
          </div>
          <DropdownMenuItem
            icon={ props => <MdWeb { ...props } /> }
            description='Form Elements'
            slug='form-elements'
            dropdown={ [
              {
                description: 'Meio de pagamento',
                href: '/method',
                slug: 'method',
              },
              {
                description: 'Meio de pagamento 2',
                href: '/method2',
                slug: 'method2',
              }
            ] }
          />
        </nav>


        <main className="flex flex-col items-center py-6 pr-9 pl-12 justify-between w-full mb-60">
          <div className="bg-white p-4 w-full h-full rounded-2xl shadow-lg">
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </div>
          <div className="p-1.5"></div>
          <div className="bg-white p-4 w-full h-full rounded-2xl shadow-lg">
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </div>
          <div className="p-1.5"></div>
          <div className="bg-white p-4 w-full h-full rounded-2xl shadow-lg">
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </div>
        </main>
      </div>
    </>
  )
}

export default Admin

