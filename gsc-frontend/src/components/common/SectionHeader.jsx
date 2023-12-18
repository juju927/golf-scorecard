const SectionHeader = ({ headerName }) => {
  return (
    <div className="flex py-5 px-2 items-center">
      <div className="flex-grow border-t border-slate-400"></div>
      <span className="flex-shrink mx-4 text-slate-400 uppercase tracking-widest text-xs">
        {headerName}
      </span>
      <div className="flex-grow border-t border-slate-400"></div>
    </div>
  );
};

export default SectionHeader;
