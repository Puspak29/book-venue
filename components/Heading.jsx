function Heading({props}) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100 px-6 py-5 mb-8">
      {/* Decorative background element */}
      
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            {props}<span className="text-indigo-600">.</span>
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Heading
