import React from 'react'
import DBSidebar from '../components/DBSidebar'
import Header from '../components/Header'
import MathBackground from '../components/MathBackground'

const Dashboard = () => {
  return (
    <section className="bg-blue-50 min-h-screen flex relative">
      <MathBackground />
      <div className="relative z-10 flex flex-col w-full">
        <Header />
        <div className="flex flex-1 min-h-0">
          <DBSidebar isOpen={true} />
          <main className="flex-1 p-6 overflow-auto">
            {/* Dashboard content goes here */}
          </main>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
