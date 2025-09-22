import TopMainBlock from '@entities/support/ui/top-main'

const TopMainContent = () => {
  return (
    <>
      <section className='container-custom md:px-41 px-2.5'>
        <div className='flex max-md:flex-col max-md:w-full gap-4'>
          <TopMainBlock
            subtitle='Программа обеспечения'
            title='SLICER.ZIP / 100 МБ'
            description="Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач."
          />
          <TopMainBlock
            subtitle='Инструкции'
            title='INSTR.PDF / 10 МБ'
            description="Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач."
          />
        </div>
      </section>
    </>
  )
}

export default TopMainContent