using AliAhmedMosaTask.Core.IRepositories;
using AliAhmedMosaTask.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace AliAhmedMosaTask.Controllers
{
    public class GovernmentController : Controller
    {
        private readonly IBaseRepository<Government> _GovernmentsRepository;
        public GovernmentController(IBaseRepository<Government> GovernmentsRepository)
        {
            _GovernmentsRepository = GovernmentsRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        
        public JsonResult GovernmentList()
        {
            var data = _GovernmentsRepository.GetAll();
            return new JsonResult(data);
        }

        //ajax add action
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Add(Government model)
        {
            
                _GovernmentsRepository.Add(model);
                return new JsonResult("Data Saved");
            
           

        }


        //ajax edit get
        public JsonResult Edit(int id)
        {
            Government government = _GovernmentsRepository.GetById(id);
            return new JsonResult(government);
        }



        //ajax edit Post
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(Government model)
        {
            
            if (ModelState.IsValid)
            {
                _GovernmentsRepository.Edit(model);
                return new JsonResult("Data Saved");
            }
            return new JsonResult("Data not saved");

        }



        //ajax delete Action
        public IActionResult Delete(int id)
        {
            Government government= _GovernmentsRepository.GetById(id);
            if (government != null)
            {
                _GovernmentsRepository.Delete(government);
            }

            return Ok();
        }


    }
}
