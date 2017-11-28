package n3m7.repository.carro;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.util.StringUtils;

import n3m7.entity.Carro;
import n3m7.entity.Fabricante;
import n3m7.entity.Modelo;

public class CarroRepositoryImpl implements CarroRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<Carro> listarByFiltro(Carro carro) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Carro> criteria = builder.createQuery(Carro.class);
		Root<Carro> root = criteria.from(Carro.class);

		// criar as restrições
		Predicate[] predicates = criarRestricoes(carro, builder, root);
		criteria.where(predicates);

		TypedQuery<Carro> query = manager.createQuery(criteria);

		return query.getResultList();
	}

	private Predicate[] criarRestricoes(Carro carro, CriteriaBuilder builder, Root<Carro> root) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(carro.getPlaca())) {
			predicates.add(builder.like(builder.upper(root.get("placa")), '%' + carro.getPlaca() + '%'));
		}
		if (carro.getModelo() != null && !StringUtils.isEmpty(carro.getModelo().getDescricao())) {
			Join<Carro, Modelo> join = root.join("modelo", JoinType.LEFT);
			predicates.add(builder.like(builder.lower(join.get("descricao")),
					'%' + carro.getModelo().getDescricao().toLowerCase() + '%'));
		}
		if (carro.getTracao() != null) {
			predicates.add(builder.equal(root.get("tracao"), carro.getTracao()));
		}
		if (carro.getCategoria() != null) {
			predicates.add(builder.equal(root.get("categoria"), carro.getCategoria()));
		}
		if (carro.getFabricante() != null && carro.getFabricante().getNome() != null) {
			Join<Carro, Fabricante> join = root.join("fabricante", JoinType.LEFT);
			predicates.add(builder.like(builder.lower(join.get("nome")),
					'%' + carro.getFabricante().getNome().toLowerCase() + '%'));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}
}
